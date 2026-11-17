import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RouteLoading() {
	const { t } = useTranslation("common");

	return (
		<div
			className="flex min-h-48 w-full items-center justify-center text-text-muted"
			role="status"
			aria-live="polite">
			<LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
			<span className="sr-only">{t("loading.route")}</span>
		</div>
	);
}
