export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	isDark: boolean;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}
