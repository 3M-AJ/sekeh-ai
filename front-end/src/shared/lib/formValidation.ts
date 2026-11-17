import i18n from "@/shared/i18n";

export const sanitizeText = (value: string) => value.trim();

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 40;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const isEmail = (value: string) => {
	const normalized = sanitizeText(value);
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
};

export const getUsernameError = (
	value: string,
	options: { allowEmail?: boolean } = {},
) => {
	const normalized = sanitizeText(value);
	const { allowEmail = false } = options;

	if (!normalized) return i18n.t("validation.usernameRequired");
	if (allowEmail && normalized.includes("@")) {
		return isEmail(normalized) ? "" : i18n.t("validation.emailInvalid");
	}
	if (normalized.length < USERNAME_MIN_LENGTH) {
		return i18n.t("validation.usernameMinLength", {
			min: USERNAME_MIN_LENGTH,
		});
	}
	if (normalized.length > USERNAME_MAX_LENGTH) {
		return i18n.t("validation.usernameMaxLength", {
			max: USERNAME_MAX_LENGTH,
		});
	}
	if (!/^[\p{L}]/u.test(normalized)) {
		return i18n.t("validation.usernameMustStartWithLetter");
	}
	if (!/[\p{L}\p{N}]$/u.test(normalized)) {
		return i18n.t("validation.usernameMustEndWithLetterOrNumber");
	}
	if (!/^[\p{L}\p{N}._-]+$/u.test(normalized)) {
		return i18n.t("validation.usernameInvalidChars");
	}
	return "";
};

export const getRequiredError = (
	value: string,
	label = i18n.t("validation.defaultFieldLabel"),
) => {
	if (!sanitizeText(value)) {
		return i18n.t("validation.required", { label });
	}
	return "";
};

export const getEmailError = (value: string) => {
	const normalized = sanitizeText(value);
	if (!normalized) return i18n.t("validation.emailRequired");
	if (!isEmail(normalized)) return i18n.t("validation.emailInvalid");
	return "";
};

export interface PasswordRuleState {
	hasValidLength: boolean;
	hasLetter: boolean;
	hasNumber: boolean;
	hasNoWhitespace: boolean;
}

export const getPasswordRuleState = (value: string): PasswordRuleState => ({
	hasValidLength:
		value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH,
	hasLetter: /\p{L}/u.test(value),
	hasNumber: /\p{N}/u.test(value),
	hasNoWhitespace: !/\s/.test(value),
});

export const getPasswordError = (value: string) => {
	if (!value) return i18n.t("validation.passwordRequired");

	const rules = getPasswordRuleState(value);
	if (!rules.hasValidLength) {
		return i18n.t("validation.passwordLengthRange", {
			min: PASSWORD_MIN_LENGTH,
			max: PASSWORD_MAX_LENGTH,
		});
	}
	if (!rules.hasNoWhitespace) return i18n.t("validation.passwordNoWhitespace");
	if (!rules.hasLetter || !rules.hasNumber) {
		return i18n.t("validation.passwordNeedsLetterAndNumber");
	}
	return "";
};

export const sanitizePhoneInput = (value: string) => {
	const withoutSpaces = value.replace(/\s+/g, "");
	if (!withoutSpaces) return "";

	if (withoutSpaces.startsWith("+")) {
		return "+" + withoutSpaces.slice(1).replace(/\D/g, "");
	}

	return withoutSpaces.replace(/\D/g, "");
};

export const parsePhoneNumber = (value: string): string | null => {
	const sanitized = sanitizePhoneInput(value);
	if (!sanitized) return null;

	const digitsOnly = sanitized.replace(/^\+/, "");
	if (digitsOnly.length < 7 || digitsOnly.length > 15) return null;

	const parsed = Number(sanitized);
	return Number.isFinite(parsed) ? sanitized : null;
};

export const getPhoneError = (value: string) => {
	const normalized = sanitizeText(value);
	if (!normalized) return i18n.t("validation.phoneRequired");

	const sanitized = sanitizePhoneInput(normalized);
	if (!sanitized) return i18n.t("validation.phoneInvalid");

	const digitsOnly = sanitized.replace(/^\+/, "");
	if (digitsOnly.length < 7 || digitsOnly.length > 15) {
		return i18n.t("validation.phoneLengthRange");
	}

	return "";
};
