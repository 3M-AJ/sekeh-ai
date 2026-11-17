export const SUPPORTED_LOCALES = ["fa", "en"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "fa";

export const RTL_LOCALES: ReadonlySet<AppLocale> = new Set(["fa"]);

export function isAppLocale(value: string): value is AppLocale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function isRtlLocale(locale: string): boolean {
	return isAppLocale(locale) && RTL_LOCALES.has(locale);
}

export function getLocaleDirection(locale: string): "rtl" | "ltr" {
	return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function applyDocumentLocale(locale: string): void {
	if (typeof document === "undefined") return;

	const dir = getLocaleDirection(locale);
	document.documentElement.lang = locale;
	document.documentElement.dir = dir;
}
