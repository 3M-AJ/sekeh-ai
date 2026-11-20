import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

export default function DeleteChatDialog({ id }: { id: number }) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useCustomMutation(chatAPI.deleteChat);

	function handleDelete() {
		mutate(id, {
			onSuccess: () => {
				closeDialog();
				queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
			},
		});
	}

	return (
		<Dialog
			trigger={
				<DialogIconTrigger
					variant="destructive"
					label={t("actions.delete")}
					icon={<X strokeWidth={1.5} />}
				/>
			}
			title={t("chat.deleteTitle")}
			footer={
				<DialogFooterActions onConfirm={handleDelete} isPending={isPending} />
			}>
			<p className="text-primary-text">
				{t("chat.deleteConfirmPrefix")}{" "}
				<span className="font-semibold">{t("chat.deleteIrreversible")}</span>{" "}
				{t("chat.deleteConfirmSuffix")}
			</p>
		</Dialog>
	);
}
