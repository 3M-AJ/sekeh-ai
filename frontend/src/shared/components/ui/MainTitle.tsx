import { useTranslation } from "react-i18next";
import MainIcon from "./MainIcon";
import { cn } from "@/shared/lib/cn";

export default function MainTitle({
	wrapperClassName,
	mainColor,
	mianColor,
	subColor,
	iconClass,
}: {
	wrapperClassName?: string;
	mainColor?: string;
	/** @deprecated Use mainColor */
	mianColor?: string;
	subColor?: string;
	iconClass?: string;
}) {
	const { t, i18n } = useTranslation("common");
	const resolvedMain = mainColor ?? mianColor ?? "accent";
	const mainstyle = {
		color: `var(--color-${resolvedMain})`,
	};
	const subStyle = {
		color: `var(--color-${subColor})`,
	};
	const isPersian = i18n.language === "fa";

	return (
		<div
			className={cn(
				"flex items-center justify-start gap-2",
				wrapperClassName,
			)}>
			<MainIcon className={cn("max-md:size-10 md:size-15", iconClass)} />
			<p
				style={subStyle}
				className="select-none text-center font-semibold text-primary-text [&>span]:text-accent-hover max-md:text-lg md:text-3xl -mt-1">
				{isPersian ? (
					<>
						<span style={mainstyle}>{t("brand.titlePrefix1")}</span>
						{t("brand.titleMid1")}{" "}
						<span style={mainstyle}>{t("brand.titlePrefix2")}</span>
						{t("brand.titleMid2")}{" "}
						<span style={mainstyle}>{t("brand.titlePrefix3")}</span>
						{t("brand.titleMid3")}
					</>
				) : (
					<span style={mainstyle}>{t("brand.titleSimple")}</span>
				)}
			</p>
		</div>
	);
}
