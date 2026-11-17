import { useTranslation } from "react-i18next";
import MainIcon from "./MainIcon";

export default function MainTitle({
	wrapperClassName,
	mianColor,
	subColor,
	iconClass,
}: {
	wrapperClassName?: string;
	mianColor?: string;
	subColor?: string;
	iconClass?: string;
}) {
	const { t, i18n } = useTranslation("common");
	const mainstyle = {
		color: `var(--color-${mianColor})`,
	};
	const subStyle = {
		color: `var(--color-${subColor})`,
	};
	const isPersian = i18n.language === "fa";

	return (
		<div
			className={`flex items-center justify-start gap-2 ${wrapperClassName}`}>
			<MainIcon className={`md:size-15 max-md:size-10 ${iconClass}`} />
			<p
				style={subStyle}
				className="select-none font-semibold md:text-3xl max-md:text-lg text-center [&>span]:text-accent-hover text-primary-text -mt-1">
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
