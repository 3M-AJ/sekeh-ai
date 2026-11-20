import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getStorageItem, setStorageItem } from "@/shared/lib/storage";
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	applyDocumentLocale,
	isAppLocale,
	type AppLocale,
} from "./locales";
import { deepMerge } from "./mergeResources";
import { sharedI18nResources } from "./resources";
import type { LocaleResources } from "./types";

export function getStoredLocale(): AppLocale {
	const stored = getStorageItem("language");
	if (stored && isAppLocale(stored)) return stored;
	return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: AppLocale): void {
	setStorageItem("language", locale);
}

export function mergeLocaleResources(
	...bundles: LocaleResources[]
): LocaleResources {
	const merged = {} as LocaleResources;

	for (const locale of SUPPORTED_LOCALES) {
		merged[locale] = {
			common: deepMerge(
				...bundles.map((bundle) => bundle[locale]?.common),
			),
			toasts: deepMerge(
				...bundles.map((bundle) => bundle[locale]?.toasts),
			),
		};
	}

	return merged;
}

let initialized = false;

export function initI18n(...appResources: LocaleResources[]) {
	if (initialized) return i18n;

	const resources = mergeLocaleResources(sharedI18nResources, ...appResources);
	const initialLocale = getStoredLocale();
	applyDocumentLocale(initialLocale);

	void i18n.use(initReactI18next).init({
		resources,
		lng: initialLocale,
		fallbackLng: DEFAULT_LOCALE,
		defaultNS: "common",
		ns: ["common", "toasts"],
		interpolation: {
			escapeValue: false,
		},
	});

	i18n.on("languageChanged", (lng) => {
		if (!isAppLocale(lng)) return;
		setStoredLocale(lng);
		applyDocumentLocale(lng);
	});

	initialized = true;
	return i18n;
}

export default i18n;
export { default as LanguageSwitcher } from "./LanguageSwitcher";
export { sharedI18nResources } from "./resources";
export type { LocaleResources, LocaleNamespaceMap } from "./types";
export {
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
	RTL_LOCALES,
	isAppLocale,
	isRtlLocale,
	getLocaleDirection,
	applyDocumentLocale,
	type AppLocale,
} from "./locales";
