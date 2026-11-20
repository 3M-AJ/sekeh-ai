import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";
import Input from "@/shared/components/ui/Input";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { getRequiredError, sanitizeText } from "@/shared/lib/formValidation";

export default function EditChatDialog({ id }: { id: number }) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState("");
	const [error, setError] = useState("");
	const { mutate, isPending } = useCustomMutation(chatAPI.editTitle, {
		onSuccess: () => {
			closeDialog();
			queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
		},
	});

	function handleEdit() {
		const nextError = getRequiredError(formData, t("chat.titleFieldName"));
		if (nextError) {
			setError(nextError);
			return;
		}

		mutate({ chat_id: id, payload: sanitizeText(formData) });
	}

	return (
		<Dialog
			variant="fullscreen"
			trigger={
				<DialogIconTrigger
					label={t("chat.editTitle")}
					icon={<PenBoxIcon strokeWidth={1.5} />}
				/>
			}
			title={t("chat.editTitle")}
			footer={
				<DialogFooterActions
					onConfirm={handleEdit}
					isPending={isPending}
					confirmLabel={t("actions.confirm")}
					confirmVariant="default"
				/>
			}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleEdit();
				}}
				id="edit-chat-form"
				className="flex flex-col gap-2">
				<Input
					label={t("chat.titleLabel")}
					placeholder={t("chat.titlePlaceholder")}
					value={formData}
					onChange={(e) => {
						setFormData(e.target.value);
						if (error) setError("");
					}}
					error={error || undefined}
					className="w-80 max-w-full"
				/>
			</form>
		</Dialog>
	);
}
