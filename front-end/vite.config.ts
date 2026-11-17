import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const storagePrefix = env.VITE_STORAGE_PREFIX || "sekeh";

	return {
		base: env.VITE_BASE_FRONT_URL,
		plugins: [
			react(),
			tailwindcss(),
			{
				name: "inject-storage-prefix",
				transformIndexHtml(html) {
					return html.replace(/%VITE_STORAGE_PREFIX%/g, storagePrefix);
				},
			},
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
