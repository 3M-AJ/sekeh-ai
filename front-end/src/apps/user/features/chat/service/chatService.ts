import { api, type ApiResponse } from "@/shared/api/client";
import type {
	AllChatsReturn,
	ChatReturn,
	MessagesReturn,
} from "@/apps/user/features/chat/types";

const chatAPI = {
	chatHistory: () => api.get<ApiResponse<AllChatsReturn>>("/chats"),

	newChat: () => api.post<ApiResponse<ChatReturn>>("/chats"),

	deleteChat: (chatId: number) =>
		api.delete<ApiResponse<string>>(`/chats/${chatId}`),

	editTitle: ({ chat_id, payload }: { chat_id: number; payload: string }) =>
		api.patch<ApiResponse<ChatReturn>>(`/chats/${chat_id}/title`, {
			title: payload,
		}),

	allMessages: (chatId: string) =>
		api.get<ApiResponse<MessagesReturn>>(`/chats/${chatId}/messages`),
};

export { chatAPI };
