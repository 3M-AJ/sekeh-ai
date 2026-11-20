import type { LocaleResources } from "./types";

import enCommon from "./locales/en/common.json";
import enToasts from "./locales/en/toasts.json";
import faCommon from "./locales/fa/common.json";
import faToasts from "./locales/fa/toasts.json";

export const sharedI18nResources: LocaleResources = {
	fa: {
		common: faCommon,
		toasts: faToasts,
	},
	en: {
		common: enCommon,
		toasts: enToasts,
	},
};
