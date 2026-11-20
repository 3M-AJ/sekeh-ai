import type {
	MessageObject,
	MessageStatus,
} from "@/apps/user/features/chat/types";
import type { ChatStreamStatus } from "@/apps/user/features/chat/hooks/useChatStream";
import i18n from "@/shared/i18n";

export interface ActiveExchange {
	userMessageId: string;
	assistantMessageId: string;
	createdAt: string;
}

export function getUserMessageState({
	status,
	requestAccepted,
	streamError,
}: {
	status: ChatStreamStatus;
	requestAccepted: boolean;
	streamError: string | null;
}): Partial<MessageObject> | null {
	if (requestAccepted) {
		return {
			status: "sent",
			error: undefined,
		};
	}

	switch (status) {
		case "sending":
			return {
				status: "sending",
				error: undefined,
			};

		case "failed":
			return {
				status: "failed",
				error: streamError ?? i18n.t("chat.sendFailed"),
			};

		case "stopped":
			return {
				status: "stopped",
				error: undefined,
			};

		default:
			return null;
	}
}

export function buildAssistantMessage({
	exchange,
	status,
	streamingText,
	jobs,
	streamError,
}: {
	exchange: ActiveExchange;
	status: ChatStreamStatus;
	streamingText: string;
	jobs: MessageObject["job_cards"];
	streamError: string | null;
}): MessageObject | null {
	const messageStatus = getAssistantMessageStatus(status);

	if (!messageStatus) {
		return null;
	}

	const hasJobs = Boolean(jobs?.length);

	return {
		message_id: exchange.assistantMessageId,
		role: "assistant",
		created_at: exchange.createdAt,
		content: getAssistantContent({
			status,
			streamingText,
			streamError,
			hasJobs,
		}),
		status: messageStatus,
		error:
			status === "failed"
				? (streamError ?? i18n.t("chat.streamFailed"))
				: undefined,
		job_cards: hasJobs ? jobs : undefined,
	};
}

export function getAssistantMessageStatus(
	status: ChatStreamStatus,
): MessageStatus | null {
	switch (status) {
		case "waiting":
			return "waiting";

		case "streaming":
			return "streaming";

		case "completed":
			return "sent";

		case "failed":
			return "failed";

		case "stopped":
			return "stopped";

		default:
			return null;
	}
}

export function getAssistantContent({
	status,
	streamingText,
	streamError,
	hasJobs,
}: {
	status: ChatStreamStatus;
	streamingText: string;
	streamError: string | null;
	hasJobs: boolean;
}): string {
	if (streamingText) {
		return streamingText;
	}

	switch (status) {
		case "waiting":
		case "streaming":
			return i18n.t("chat.preparingReply");

		case "failed":
			return streamError ?? i18n.t("chat.streamFailed");

		case "stopped":
			return i18n.t("chat.generationStopped");

		case "completed":
			return hasJobs ? "" : i18n.t("chat.noServerReply");

		default:
			return "";
	}
}

export function canDisplayAssistant(status: ChatStreamStatus): boolean {
	return (
		status === "waiting" ||
		status === "streaming" ||
		status === "completed" ||
		status === "failed" ||
		status === "stopped"
	);
}

export function isTerminalStreamStatus(status: ChatStreamStatus): boolean {
	return status === "completed" || status === "failed" || status === "stopped";
}

export function createLocalMessageId(prefix: string): string {
	if (
		typeof crypto !== "undefined" &&
		typeof crypto.randomUUID === "function"
	) {
		return `${prefix}-${crypto.randomUUID()}`;
	}

	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function updateMessageById(
	messages: MessageObject[],
	messageId: string,
	changes: Partial<MessageObject>,
): MessageObject[] {
	let changed = false;

	const nextMessages = messages.map((message) => {
		if (message.message_id !== messageId) {
			return message;
		}

		const nextMessage = {
			...message,
			...changes,
		};

		if (
			message.status === nextMessage.status &&
			message.error === nextMessage.error
		) {
			return message;
		}

		changed = true;
		return nextMessage;
	});

	return changed ? nextMessages : messages;
}

export function upsertLocalMessage(
	messages: MessageObject[],
	nextMessage: MessageObject,
): MessageObject[] {
	const existingIndex = messages.findIndex(
		(message) => message.message_id === nextMessage.message_id,
	);

	if (existingIndex === -1) {
		return [...messages, nextMessage];
	}

	const existingMessage = messages[existingIndex];

	if (
		existingMessage.content === nextMessage.content &&
		existingMessage.status === nextMessage.status &&
		existingMessage.error === nextMessage.error &&
		haveSameJobCards(existingMessage.job_cards, nextMessage.job_cards)
	) {
		return messages;
	}

	return messages.map((message) =>
		message.message_id === nextMessage.message_id ? nextMessage : message,
	);
}

export function compareMessagesByCreatedAt(
	firstMessage: MessageObject,
	secondMessage: MessageObject,
): number {
	const firstTimestamp = Date.parse(firstMessage.created_at);
	const secondTimestamp = Date.parse(secondMessage.created_at);

	if (Number.isNaN(firstTimestamp) || Number.isNaN(secondTimestamp)) {
		return 0;
	}

	return firstTimestamp - secondTimestamp;
}

export function isMessageSynchronized({
	localMessage,
	serverMessages,
	activeUserMessageId,
}: {
	localMessage: MessageObject;
	serverMessages: MessageObject[];
	activeUserMessageId: string | null;
}): boolean {
	if (localMessage.message_id === activeUserMessageId) {
		return false;
	}

	if (
		localMessage.role === "user" &&
		(localMessage.status === "failed" || localMessage.status === "stopped")
	) {
		return false;
	}

	return serverMessages.some((serverMessage) => {
		if (!messagesHaveEquivalentContent(localMessage, serverMessage)) {
			return false;
		}

		const localTimestamp = Date.parse(localMessage.created_at);
		const serverTimestamp = Date.parse(serverMessage.created_at);

		if (Number.isNaN(localTimestamp) || Number.isNaN(serverTimestamp)) {
			return true;
		}

		return (
			serverTimestamp >= localTimestamp - 5_000 &&
			serverTimestamp <= localTimestamp + 10 * 60_000
		);
	});
}

export function messagesHaveEquivalentContent(
	firstMessage: MessageObject,
	secondMessage: MessageObject,
): boolean {
	if (firstMessage.role !== secondMessage.role) {
		return false;
	}

	if (firstMessage.content.trim() !== secondMessage.content.trim()) {
		return false;
	}

	return haveSameJobCards(firstMessage.job_cards, secondMessage.job_cards);
}

export function haveSameJobCards(
	firstJobs: MessageObject["job_cards"],
	secondJobs: MessageObject["job_cards"],
): boolean {
	const firstJobUrls = (firstJobs ?? []).map((job) => job.job_url).sort();
	const secondJobUrls = (secondJobs ?? []).map((job) => job.job_url).sort();

	if (firstJobUrls.length !== secondJobUrls.length) {
		return false;
	}

	return firstJobUrls.every((jobUrl, index) => jobUrl === secondJobUrls[index]);
}
