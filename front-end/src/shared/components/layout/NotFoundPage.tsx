import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
	const navigate = useNavigate();
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col gap-5 items-center justify-center h-screen bg-accent-soft">
			<p className="font-semibold text-5xl text-accent">{t("notFound.code")}</p>
			<p className="font-medium text-3xl text-primary-action">
				{t("notFound.title")}
			</p>
			<button
				onClick={() => navigate(-1)}
				className="border-b-2 border-b-accent-hover text-accent-hover
				cursor-pointer">
				{t("notFound.backHome")}
			</button>
		</div>
	);
}
