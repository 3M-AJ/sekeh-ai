import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	getPasswordRuleState,
} from "@/shared/lib/formValidation";
import { Check, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PasswordRequirementsProps {
	value: string;
}

export default function PasswordRequirements({
	value,
}: PasswordRequirementsProps) {
	const { t } = useTranslation("common");
	const rules = getPasswordRuleState(value);
	const requirements = [
		{
			label: t("passwordRules.lengthRange", {
				min: PASSWORD_MIN_LENGTH,
				max: PASSWORD_MAX_LENGTH,
			}),
			isMet: rules.hasValidLength,
		},
		{ label: t("passwordRules.minLetter"), isMet: rules.hasLetter },
		{ label: t("passwordRules.minNumber"), isMet: rules.hasNumber },
		{ label: t("passwordRules.noWhitespace"), isMet: rules.hasNoWhitespace },
	];

	return (
		<ul
			className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2"
			aria-label={t("passwordRules.ariaLabel")}>
			{requirements.map((requirement) => (
				<li
					key={requirement.label}
					className={
						requirement.isMet ? "text-informational" : "text-text-muted"
					}>
					<span className="flex items-center gap-1.5">
						{requirement.isMet ? (
							<Check className="size-3.5" aria-hidden="true" />
						) : (
							<Circle className="size-3.5" aria-hidden="true" />
						)}
						{requirement.label}
					</span>
				</li>
			))}
		</ul>
	);
}
