import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { resumeAPI } from "@/apps/user/features/resume/service/resumeService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

export default function DeleteResumeDialog({ id }: { id: number | string }) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useCustomMutation(resumeAPI.deleteResume, {
		onSuccess: () => {
			closeDialog();
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		},
	});

	return (
		<Dialog
			trigger={
				<DialogIconTrigger
					variant="destructive"
					label={t("actions.delete")}
					icon={<X strokeWidth={1.5} />}
				/>
			}
			title={t("resume.deleteTitle")}
			footer={
				<DialogFooterActions
					onConfirm={() => mutate(id)}
					isPending={isPending}
				/>
			}>
			<p className="text-primary-text">
				{t("resume.deleteConfirmPrefix")}{" "}
				<span className="font-semibold">{t("resume.deleteIrreversible")}</span>{" "}
				{t("resume.deleteConfirmSuffix")}
			</p>
		</Dialog>
	);
}
