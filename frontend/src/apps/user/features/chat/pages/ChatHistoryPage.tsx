import { MessageSquareText } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Components
import NewChatDialog from "@/apps/user/features/chat/components/NewChatDialog";
import HistoryCard from "@/apps/user/features/chat/components/ChatHistoryCard";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import EmptyState from "@/shared/components/feedback/EmptyState";
import { ChatHistoryGridSkeleton } from "@/shared/components/feedback/Skeleton";

// Hooks
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

export default function ChatHistoryPage() {
	const { t } = useTranslation("common");
	const { data, isPending } = useCustomQuery({
		key: ["chatHistory"],
		func: chatAPI.chatHistory,
	});

	const chats = data?.data?.chats ?? [];
	const hasChats = chats.length > 0;

	return (
		<Section
			title={
				<PageTitle
					icon={MessageSquareText}
					title={t("chat.historyTitle")}
					desc={t("chat.historyDescription")}
				/>
			}
			header={<NewChatDialog />}>
			{isPending ? (
				<ChatHistoryGridSkeleton />
			) : hasChats ? (
				<div className="grid grid-cols-5 gap-5 max-[1100px]:grid-cols-3 max-md:grid-cols-1">
					{chats.map((h) => (
						<HistoryCard card={h} key={h.chat_id} />
					))}
				</div>
			) : (
				<EmptyState message={t("chat.historyEmpty")} icon={MessageSquareText} />
			)}
		</Section>
	);
}
