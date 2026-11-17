$ErrorActionPreference = "Stop"
$pgRoot = "C:\Program Files\PostgreSQL\17"
$psql = Join-Path $pgRoot "bin\psql.exe"
$pgCtl = Join-Path $pgRoot "bin\pg_ctl.exe"
$dataDir = Join-Path $pgRoot "data"
$hba = Join-Path $dataDir "pg_hba.conf"
$hbaBackup = Join-Path $dataDir "pg_hba.conf.sekeh.bak"
$extractDir = "$env:TEMP\pgvector-pg17"
$statusFile = "C:\vscode projects\sekeh-ai\scripts\.local-pg-setup-status.txt"
$localPassword = "sekeh_local_dev"

function Write-Status([string]$msg) { Add-Content -Path $statusFile -Value $msg }

# Copy pgvector into Postgres tree
Copy-Item (Join-Path $extractDir "lib\vector.dll") (Join-Path $pgRoot "lib\vector.dll") -Force
Copy-Item (Join-Path $extractDir "share\extension\*") (Join-Path $pgRoot "share\extension\") -Force
Write-Status "PGVECTOR=files_copied"

# Create extension while trust is still active
& $psql -U postgres -h 127.0.0.1 -p 5432 -d sekeh -v ON_ERROR_STOP=1 -c "CREATE EXTENSION IF NOT EXISTS vector;"
$ver = (& $psql -U postgres -h 127.0.0.1 -p 5432 -d sekeh -tAc "SELECT extversion FROM pg_extension WHERE extname='vector';").Trim()
Write-Status "VECTOR_EXT=$ver"

# Restore scram auth
if (Test-Path $hbaBackup) {
  Copy-Item $hbaBackup $hba -Force
} else {
  $hbaText = Get-Content $hba -Raw
  $hbaText = $hbaText -replace "host\s+all\s+all\s+127\.0\.0\.1/32\s+trust", "host    all             all             127.0.0.1/32            scram-sha-256"
  $hbaText = $hbaText -replace "host\s+all\s+all\s+::1/128\s+trust", "host    all             all             ::1/128                 scram-sha-256"
  Set-Content -Path $hba -Value $hbaText -NoNewline
}
& $pgCtl reload -D $dataDir | Out-Null
Write-Status "HBA=scram_restored"

# Verify password auth still works
$env:PGPASSWORD = $localPassword
& $psql -U postgres -h 127.0.0.1 -p 5432 -d sekeh -v ON_ERROR_STOP=1 -c "SELECT extname, extversion FROM pg_extension WHERE extname='vector';"
Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
Write-Status "AUTH=password_ok"
Write-Status "DONE $(Get-Date -Format o)"
