import { useRef } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { PenBox } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
// import Dialog from "@/shared/components/ui/Dialog";
import GrowableButton from "@/shared/components/ui/GrowableButton";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// import LoadingIcon from "../../assets/icons/LoadingIcon";

export default function NewChatDialog() {
	const { t } = useTranslation("common");
	const queryClient = useQueryClient();
	const { mutate } = useCustomMutation(chatAPI.newChat, {
		onSuccess: (res) => {
			const { chat } = res.data;

			if (cancelButton.current) {
				const btn = cancelButton.current as HTMLButtonElement;
				btn.click();
			}

			queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
			navigate("/chats/" + chat.chat_id);
		},
	}); //isPending
	const cancelButton = useRef(null);
	const navigate = useNavigate();

	function handleNewChat() {
		mutate();
	}

	return (
		// <Dialog
		// 	trigger={
		<GrowableButton
			onClick={handleNewChat}
			label={t("chat.newChat")}
			icon={
				<PenBox
					strokeWidth={1.5}
					className="w-5 h-5 transition-colors duration-200 text-primary-action group-hover:text-white"
				/>
			}
		/>
		// 	}
		// 	title="Enter A Title"
		// 	footer={
		// 		<button
		// 			type="submit"
		// 			form="new-chat-form"
		// 			className={`w-20 py-1 px-3 border-2 border-accent text-accent rounded-md font-semibold cursor-pointer
		//      hover:bg-accent hover:text-white transition-all duration-150 flex justify-center items-center
		// 			${isPending ? "pointer-events-none" : ""}`}>
		// 			{isPending ? <LoadingIcon color="accent" /> : "Submit"}
		// 		</button>
		// 	}
		// closeButton={
		// 		<button
		// 			ref={cancelButton}
		// 			popoverTarget="new-chat-dialog"
		// 			popoverTargetAction="hide"
		// 			className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
		//      hover:bg-primary-action hover:text-white transition-all duration-150">
		// 			Cancel
		// 		</button>
		// }>
		// 	<form
		// 		id="new-chat-form"
		// 		onSubmit={(e) => {
		// 			e.preventDefault();
		// 			handleNewChat();
		// 		}}
		// 		className="flex flex-col gap-2">
		// 		<label className="text-[16px] text-primary-action">Title</label>
		// 		<input
		// 			className="border-2 border-border rounded-md py-2 px-2 w-80 outline-0"
		// 			placeholder="New Chat..."
		// 			value={formData}
		// 			onChange={(e) => setFormData(e.target.value)}></input>
		// 	</form>
		// </Dialog>
	);
}
