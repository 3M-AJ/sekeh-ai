import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
import Dialog from "@/shared/components/ui/Dialog";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { getRequiredError, sanitizeText } from "@/shared/lib/formValidation";

export default function EditChatDialog({ id }: { id: number }) {
	const { t } = useTranslation("common");
	const { mutate, isPending } = useCustomMutation(chatAPI.editTitle, {
		onSuccess: () => {
			if (cancelButton.current) {
				const btn = cancelButton.current as HTMLButtonElement;
				btn.click();
			}

			queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
		},
	});
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<string>("");
	const [error, setError] = useState("");
	const cancelButton = useRef(null);

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
				<div
					className="border-2 border-primary-action rounded-full hover:bg-primary-action transition-all duration-100 p-1 size-7 cursor-pointer
				hover:*:text-white">
					<PenBoxIcon
						strokeWidth={1.5}
						className="size-full text-primary-actio"
					/>
				</div>
			}
			title={t("chat.editTitle")}
			footer={
				<button
					type="submit"
					form="edit-chat-form"
					className={`py-1 px-3 border-2 border-accent text-accent rounded-md font-semibold cursor-pointer
            hover:bg-accent hover:text-white transition-all duration-150 w-20 flex items-center justify-center ${isPending ? "pointer-events-none" : ""}`}>
					{isPending ? (
						<LoaderCircle className={`text-accent! animate-spin`} />
					) : (
						t("actions.confirm")
					)}
				</button>
			}
			closeButton={
				<button
					ref={cancelButton}
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
          hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.back")}
				</button>
			}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleEdit();
				}}
				id="edit-chat-form"
				className="flex flex-col gap-2">
				<label className="text-[16px] text-primary-action">
					{t("chat.titleLabel")}
				</label>
				<input
					className={`border-2 rounded-md py-2 px-2 w-80 outline-0 ${error ? "border-red-500" : "border-border"}`}
					placeholder={t("chat.titlePlaceholder")}
					value={formData}
					onChange={(e) => {
						setFormData(e.target.value);
						if (error) setError("");
					}}
				/>
				{error ? <p className="text-sm text-red-500">{error}</p> : null}
			</form>
		</Dialog>
	);
}
