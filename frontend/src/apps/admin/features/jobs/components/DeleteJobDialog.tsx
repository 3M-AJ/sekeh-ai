import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { jobsAPI } from "@/apps/admin/features/jobs/service/jobsService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

interface DeleteJobDialogProps {
	id: number;
	title: string;
	onDeleted: () => void;
}

export default function DeleteJobDialog({
	id,
	title,
	onDeleted,
}: DeleteJobDialogProps) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();
	const { mutate, isPending } = useCustomMutation(jobsAPI.deleteJob, {
		onSuccess: () => {
			closeDialog();
			onDeleted();
		},
	});

	return (
		<Dialog
			trigger={
				<DialogIconTrigger
					variant="destructive"
					label={t("actions.delete")}
					icon={<X />}
				/>
			}
			title={t("admin.deleteJobTitle")}
			footer={
				<DialogFooterActions
					onConfirm={() => mutate(id)}
					isPending={isPending}
					cancelLabel={t("actions.cancel")}
				/>
			}>
			<p className="text-primary-text">{t("admin.deleteJobBody", { title })}</p>
		</Dialog>
	);
}
