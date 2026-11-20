/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_BASE_FRONT_URL: string;
	readonly VITE_STORAGE_PREFIX: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	__STORAGE_PREFIX__?: string;
}
