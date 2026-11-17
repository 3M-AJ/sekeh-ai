import type { LocaleResources } from "@/shared/i18n/types";

import enCommon from "./locales/en/common.json";
import enToasts from "./locales/en/toasts.json";
import faCommon from "./locales/fa/common.json";
import faToasts from "./locales/fa/toasts.json";

export const adminI18nResources: LocaleResources = {
	fa: {
		common: faCommon,
		toasts: faToasts,
	},
	en: {
		common: enCommon,
		toasts: enToasts,
	},
};
