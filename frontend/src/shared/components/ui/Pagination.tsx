import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "@/shared/components/ui/Button";

interface PaginationProps {
	page: number;
	pages: number;
	onChange: (page: number) => void;
}

export default function Pagination({ page, pages, onChange }: PaginationProps) {
	const { t, i18n } = useTranslation("common");
	if (pages <= 1) return null;

	const isRtl = i18n.dir() === "rtl";
	const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
	const NextIcon = isRtl ? ChevronLeft : ChevronRight;

	return (
		<div className="flex items-center justify-center gap-2 pt-4">
			<Button
				type="button"
				variant="outline"
				size="icon"
				disabled={page <= 1}
				onClick={() => onChange(page - 1)}
				aria-label={t("pagination.prev", { defaultValue: "Previous page" })}
				className="size-8">
				<PrevIcon className="size-4" />
			</Button>

			<span className="px-2 text-sm font-medium text-text-muted">
				{page} / {pages}
			</span>

			<Button
				type="button"
				variant="outline"
				size="icon"
				disabled={page >= pages}
				onClick={() => onChange(page + 1)}
				aria-label={t("pagination.next", { defaultValue: "Next page" })}
				className="size-8">
				<NextIcon className="size-4" />
			</Button>
		</div>
	);
}
