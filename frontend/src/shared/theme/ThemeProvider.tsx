import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type PropsWithChildren,
} from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./types";
import {
	applyResolvedTheme,
	getStoredTheme,
	resolveTheme,
	storeTheme,
} from "./themeUtils";

export default function ThemeProvider({ children }: PropsWithChildren) {
	const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
	const [resolvedTheme, setResolvedTheme] = useState(() =>
		resolveTheme(getStoredTheme()),
	);

	const setTheme = useCallback((next: Theme) => {
		storeTheme(next);
		const resolved = resolveTheme(next);
		setThemeState(next);
		setResolvedTheme(resolved);
		applyResolvedTheme(resolved);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setTheme]);

	useEffect(() => {
		applyResolvedTheme(resolvedTheme);
	}, [resolvedTheme]);

	useEffect(() => {
		if (theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			const resolved = resolveTheme("system");
			setResolvedTheme(resolved);
			applyResolvedTheme(resolved);
		};

		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			resolvedTheme,
			isDark: resolvedTheme === "dark",
			setTheme,
			toggleTheme,
		}),
		[theme, resolvedTheme, setTheme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}
