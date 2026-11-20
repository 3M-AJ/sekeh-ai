import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import Button from "@/shared/components/ui/Button";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";

interface DialogFooterActionsProps {
	onConfirm: () => void;
	confirmLabel?: string;
	cancelLabel?: string;
	confirmVariant?: "default" | "destructive" | "outline";
	isPending?: boolean;
	confirmIcon?: ReactNode;
	disableConfirm?: boolean;
}

export default function DialogFooterActions({
	onConfirm,
	confirmLabel,
	cancelLabel,
	confirmVariant = "destructive",
	isPending = false,
	confirmIcon,
	disableConfirm = false,
}: DialogFooterActionsProps) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();

	return (
		<>
			<Button
				type="button"
				variant="outline"
				onClick={closeDialog}
				disabled={isPending}
				className="rounded-md">
				{cancelLabel ?? t("actions.back")}
			</Button>
			<Button
				type="button"
				variant={confirmVariant}
				onClick={onConfirm}
				disabled={isPending || disableConfirm}
				className="min-w-20 rounded-md">
				{isPending ? (
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<>
						{confirmIcon}
						<span>{confirmLabel ?? t("actions.delete")}</span>
					</>
				)}
			</Button>
		</>
	);
}
