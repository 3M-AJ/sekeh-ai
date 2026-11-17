$ErrorActionPreference = "Stop"

$pgRoot = "C:\Program Files\PostgreSQL\17"
$psql = Join-Path $pgRoot "bin\psql.exe"
$pgCtl = Join-Path $pgRoot "bin\pg_ctl.exe"
$dataDir = Join-Path $pgRoot "data"
$hba = Join-Path $dataDir "pg_hba.conf"
$hbaBackup = Join-Path $dataDir "pg_hba.conf.sekeh.bak"
$statusFile = "C:\vscode projects\sekeh-ai\scripts\.local-pg-setup-status.txt"
$zipPath = "$env:TEMP\vector.v0.8.7-pg17.zip"
$extractDir = "$env:TEMP\pgvector-pg17"
$downloadUrl = "https://github.com/andreiramani/pgvector_pgsql_windows/releases/download/0.8.7/vector.v0.8.7-pg17.zip"
# Local-only password written into .env by the caller after success.
$localPassword = "sekeh_local_dev"

function Write-Status([string]$msg) {
  Add-Content -Path $statusFile -Value $msg
}

Set-Content -Path $statusFile -Value "START $(Get-Date -Format o)"

# Ensure service is running
$svc = Get-Service postgresql-x64-17
if ($svc.Status -ne "Running") {
  Start-Service postgresql-x64-17
  Start-Sleep -Seconds 2
}
Write-Status "SERVICE=Running"

# Backup and temporarily allow local trust auth so we can reset password
Copy-Item $hba $hbaBackup -Force
$hbaText = Get-Content $hba -Raw
$hbaText = $hbaText -replace "host\s+all\s+all\s+127\.0\.0\.1/32\s+scram-sha-256", "host    all             all             127.0.0.1/32            trust"
$hbaText = $hbaText -replace "host\s+all\s+all\s+::1/128\s+scram-sha-256", "host    all             all             ::1/128                 trust"
Set-Content -Path $hba -Value $hbaText -NoNewline
& $pgCtl reload -D $dataDir | Out-Null
Write-Status "HBA=trust_reload"

# Reset password + create database
& $psql -U postgres -h 127.0.0.1 -p 5432 -d postgres -v ON_ERROR_STOP=1 -c "ALTER USER postgres WITH PASSWORD '$localPassword';"
$dbExists = & $psql -U postgres -h 127.0.0.1 -p 5432 -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='sekeh';"
if (-not $dbExists.Trim()) {
  & $psql -U postgres -h 127.0.0.1 -p 5432 -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE sekeh OWNER postgres;"
}
Write-Status "DB=sekeh_ready"

# Install pgvector files into Postgres install tree
if (Test-Path $extractDir) { Remove-Item $extractDir -Recurse -Force }
New-Item -ItemType Directory -Path $extractDir | Out-Null
Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force

# Archive layouts vary; copy any vector.* extension/sql/control and vector.dll
$vectorDll = Get-ChildItem $extractDir -Recurse -Filter "vector.dll" | Select-Object -First 1
$extFiles = Get-ChildItem $extractDir -Recurse -Include "vector.control","vector--*.sql" 
if (-not $vectorDll) { throw "vector.dll not found in archive" }
if (-not $extFiles) { throw "vector extension SQL/control files not found" }

Copy-Item $vectorDll.FullName (Join-Path $pgRoot "lib\vector.dll") -Force
foreach ($f in $extFiles) {
  Copy-Item $f.FullName (Join-Path $pgRoot "share\extension\$($f.Name)") -Force
}
Write-Status "PGVECTOR=files_copied"

# Restore scram auth
Copy-Item $hbaBackup $hba -Force
& $pgCtl reload -D $dataDir | Out-Null
Write-Status "HBA=scram_restored"

# Verify extension with password
$env:PGPASSWORD = $localPassword
& $psql -U postgres -h 127.0.0.1 -p 5432 -d sekeh -v ON_ERROR_STOP=1 -c "CREATE EXTENSION IF NOT EXISTS vector;"
$ver = & $psql -U postgres -h 127.0.0.1 -p 5432 -d sekeh -tAc "SELECT extversion FROM pg_extension WHERE extname='vector';"
Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
Write-Status "VECTOR_EXT=$($ver.Trim())"
Write-Status "PASSWORD=sekeh_local_dev"
Write-Status "DONE $(Get-Date -Format o)"
