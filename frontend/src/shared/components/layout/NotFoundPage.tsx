import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "@/shared/components/ui/Button";

export default function NotFoundPage() {
	const navigate = useNavigate();
	const { t } = useTranslation("common");

	return (
		<div className="flex h-dvh flex-col items-center justify-center gap-5 bg-accent-soft">
			<p className="text-5xl font-semibold text-accent">{t("notFound.code")}</p>
			<p className="text-3xl font-medium text-primary-action">
				{t("notFound.title")}
			</p>
			<Button variant="ghost" onClick={() => navigate(-1)}>
				{t("notFound.backHome")}
			</Button>
		</div>
	);
}
