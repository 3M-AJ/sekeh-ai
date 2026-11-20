import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backendDir = path.join(root, "backend");
const isWindows = process.platform === "win32";

const venvPython = isWindows
	? path.join(backendDir, "venv", "Scripts", "python.exe")
	: path.join(backendDir, "venv", "bin", "python");

const python = fs.existsSync(venvPython) ? venvPython : isWindows ? "python" : "python3";

const child = spawn(python, ["app.py"], {
	cwd: backendDir,
	stdio: "inherit",
	shell: false,
});

child.on("exit", (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}
	process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => {
		if (!child.killed) child.kill(signal);
	});
}
