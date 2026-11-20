import type { AppLocale } from "./locales";

export type LocaleNamespaceMap = {
	common: Record<string, unknown>;
	toasts: Record<string, unknown>;
};

export type LocaleResources = Record<AppLocale, LocaleNamespaceMap>;
