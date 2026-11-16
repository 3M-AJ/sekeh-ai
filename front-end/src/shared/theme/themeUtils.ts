import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./constants";
import type { ResolvedTheme, Theme } from "./types";

export function getStoredTheme(): Theme {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
	} catch {
		// localStorage may be unavailable
	}
	return DEFAULT_THEME;
}

export function storeTheme(theme: Theme): void {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		// localStorage may be unavailable
	}
}

export function getSystemTheme(): ResolvedTheme {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function resolveTheme(theme: Theme): ResolvedTheme {
	return theme === "system" ? getSystemTheme() : theme;
}

export function applyResolvedTheme(resolved: ResolvedTheme): void {
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.classList.toggle("light", resolved === "light");
	root.style.colorScheme = resolved;
}
