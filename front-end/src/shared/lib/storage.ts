const PREFIX = import.meta.env.VITE_STORAGE_PREFIX;

export function storageKey(key: string): string {
	return `${PREFIX}-${key}`;
}

export const STORAGE_KEYS = {
	theme: storageKey("theme"),
	accessToken: storageKey("access-token"),
	refreshToken: storageKey("refresh-token"),
	language: storageKey("language"),
} as const;

type StorageKeyName = keyof typeof STORAGE_KEYS;

function resolveKey(key: StorageKeyName | string): string {
	if (key in STORAGE_KEYS) {
		return STORAGE_KEYS[key as StorageKeyName];
	}
	return storageKey(key);
}

export function getStorageItem(key: StorageKeyName | string): string | null {
	try {
		return localStorage.getItem(resolveKey(key));
	} catch {
		return null;
	}
}

export function setStorageItem(
	key: StorageKeyName | string,
	value: string,
): void {
	try {
		localStorage.setItem(resolveKey(key), value);
	} catch {
		// localStorage may be unavailable
	}
}

export function removeStorageItem(key: StorageKeyName | string): void {
	try {
		localStorage.removeItem(resolveKey(key));
	} catch {
		// localStorage may be unavailable
	}
}

export function clearAppStorage(): void {
	try {
		const prefix = `${PREFIX}-`;
		const keysToRemove: string[] = [];

		for (let i = 0; i < localStorage.length; i += 1) {
			const key = localStorage.key(i);
			if (key?.startsWith(prefix)) keysToRemove.push(key);
		}

		keysToRemove.forEach((key) => localStorage.removeItem(key));
	} catch {
		// localStorage may be unavailable
	}
}
