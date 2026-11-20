import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { PenBox } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
import GrowableButton from "@/shared/components/ui/GrowableButton";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

export default function NewChatDialog() {
	const { t } = useTranslation("common");
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate } = useCustomMutation(chatAPI.newChat, {
		onSuccess: (res) => {
			const { chat } = res.data;
			queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
			navigate("/chats/" + chat.chat_id);
		},
	});

	return (
		<GrowableButton
			onClick={() => mutate()}
			label={t("chat.newChat")}
			icon={
				<PenBox
					strokeWidth={1.5}
					className="size-5 text-primary-action transition-colors duration-200 group-hover:text-on-accent group-focus-visible:text-on-accent"
				/>
			}
		/>
	);
}
