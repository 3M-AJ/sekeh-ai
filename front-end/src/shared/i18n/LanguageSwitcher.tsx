import { Languages } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ButtonHTMLAttributes } from "react";

import Dialog from "@/shared/components/ui/Dialog";
import { cn } from "@/shared/lib/cn";
import { DEFAULT_LOCALE, isAppLocale, type AppLocale } from "./locales";

type LanguageSwitcherProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"children" | "onClick" | "type"
>;

const LOCALE_OPTIONS: { value: AppLocale; labelKey: string }[] = [
	{ value: "fa", labelKey: "language.persian" },
	{ value: "en", labelKey: "language.english" },
];

export default function LanguageSwitcher({
	className,
	...props
}: LanguageSwitcherProps) {
	const { t, i18n } = useTranslation("common");
	const [open, setOpen] = useState(false);
	const activeLocale = isAppLocale(i18n.language)
		? i18n.language
		: DEFAULT_LOCALE;

	const handleSelect = (locale: AppLocale) => {
		if (locale !== activeLocale) {
			void i18n.changeLanguage(locale);
		}
		setOpen(false);
	};

	return (
		<Dialog
			title={t("language.title")}
			open={open}
			onOpenChange={setOpen}
			trigger={
				<button
					type="button"
					aria-label={t("language.triggerAria")}
					title={t("language.title")}
					className={cn(
						"inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-primary-action transition-colors hover:bg-surface hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
						className,
					)}
					{...props}>
					<Languages strokeWidth={1.75} className="size-4.5" />
				</button>
			}>
			<div className="flex flex-col gap-2">
				{LOCALE_OPTIONS.map(({ value, labelKey }) => {
					const selected = value === activeLocale;
					return (
						<button
							key={value}
							type="button"
							onClick={() => handleSelect(value)}
							className={cn(
								"flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-start transition-colors",
								selected
									? "border-accent bg-accent-soft text-primary-text"
									: "border-border bg-background text-primary-text hover:border-accent hover:bg-surface",
							)}>
							<span className="font-medium">{t(labelKey)}</span>
							<span
								className={cn(
									"size-4 rounded-full border-2",
									selected
										? "border-accent bg-accent"
										: "border-border bg-transparent",
								)}
							/>
						</button>
					);
				})}
			</div>
		</Dialog>
	);
}
