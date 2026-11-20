import type { Job } from "@/shared/types";

export type MessageRole = "user" | "assistant";

/**
 * UI lifecycle of a message.
 *
 * Server messages do not need to return this field.
 * When status is missing, the UI treats the message as successfully completed.
 */
export type MessageStatus =
	| "sending"
	| "sent"
	| "waiting"
	| "streaming"
	| "failed"
	| "stopped";

export interface MessageObject {
	message_id: string;
	created_at: string;
	content: string;
	role: MessageRole;
	job_cards?: Job[];

	/**
	 * Local UI state.
	 *
	 * This property is optional because messages loaded from the API may not
	 * contain a status. Existing server messages are considered completed.
	 */
	status?: MessageStatus;

	/**
	 * Optional error belonging specifically to this message.
	 */
	error?: string;
}

export interface ChatObject {
	chat_id: number;
	created_at: string;
	title: string;
	updated_at: string;
}

export interface AllChatsReturn {
	chats: ChatObject[];
}

export interface ChatReturn {
	chat: ChatObject;
}

export interface MessagesReturn {
	chat: ChatObject;
	messages: MessageObject[];
}
