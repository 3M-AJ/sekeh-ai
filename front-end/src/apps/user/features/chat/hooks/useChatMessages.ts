import { useEffect, useMemo, useState } from "react";

// Types
import type { MessageObject } from "@/apps/user/features/chat/types";

// Services
import { chatAPI } from "@/apps/user/features/chat/service/chatService";

// Hooks
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";
import { useChatStream } from "./useChatStream";

// Utils
import {
	buildAssistantMessage,
	canDisplayAssistant,
	compareMessagesByCreatedAt,
	getUserMessageState,
	isMessageSynchronized,
	isTerminalStreamStatus,
	messagesHaveEquivalentContent,
	updateMessageById,
	upsertLocalMessage,
	type ActiveExchange,
} from "@/apps/user/features/chat/utils/chatMessageUtils";

const EMPTY_MESSAGES: MessageObject[] = [];

export function useChatMessages(chatId?: string) {
	const isChatReady = Boolean(chatId);
	const { data, isLoading } = useCustomQuery({
		key: ["chatMessages", chatId],
		func: () => chatAPI.allMessages(chatId ?? ""),
		options: { enabled: isChatReady },
	});
	const serverMessages = data?.data.messages ?? EMPTY_MESSAGES;
	const [localMessages, setLocalMessages] = useState<MessageObject[]>([]);
	const [activeExchange, setActiveExchange] = useState<ActiveExchange | null>(
		null,
	);
	const [welcomeCreatedAt] = useState(() => new Date().toISOString());
	const stream = useChatStream(chatId ?? "");
	const {
		resetStream,
		status,
		requestAccepted,
		isBusy,
		assistantStreamingText,
		jobs,
		streamError,
	} = stream;

	const activeUserMessageId = isBusy
		? (activeExchange?.userMessageId ?? null)
		: null;

	useEffect(() => {
		resetStream();
		(() => {
			setLocalMessages([]);
			setActiveExchange(null);
		})();
	}, [chatId, resetStream]);

	useEffect(() => {
		if (!activeExchange) return;
		const nextState = getUserMessageState({
			status,
			requestAccepted,
			streamError,
		});
		if (!nextState) return;
		(() =>
			setLocalMessages((current) =>
				updateMessageById(current, activeExchange.userMessageId, nextState),
			))();
	}, [activeExchange, status, requestAccepted, streamError]);

	const terminalAssistantMessage = useMemo<MessageObject | null>(() => {
		if (
			!activeExchange ||
			!requestAccepted ||
			!isTerminalStreamStatus(status)
		) {
			return null;
		}
		return buildAssistantMessage({
			exchange: activeExchange,
			status,
			streamingText: assistantStreamingText,
			jobs,
			streamError,
		});
	}, [
		activeExchange,
		requestAccepted,
		status,
		assistantStreamingText,
		jobs,
		streamError,
	]);

	useEffect(() => {
		if (!terminalAssistantMessage) return;
		(() =>
			setLocalMessages((current) =>
				upsertLocalMessage(current, terminalAssistantMessage),
			))();
	}, [terminalAssistantMessage]);

	useEffect(() => {
		if (serverMessages.length === 0) return;
		(() =>
			setLocalMessages((current) => {
				const next = current.filter(
					(localMessage) =>
						!isMessageSynchronized({
							localMessage,
							serverMessages,
							activeUserMessageId,
						}),
				);
				return next.length === current.length ? current : next;
			}))();
	}, [serverMessages, activeUserMessageId]);

	const visibleLocalMessages = useMemo(
		() =>
			localMessages.filter(
				(localMessage) =>
					!isMessageSynchronized({
						localMessage,
						serverMessages,
						activeUserMessageId,
					}),
			),
		[localMessages, serverMessages, activeUserMessageId],
	);

	const visibleMessages = useMemo(
		() =>
			[...serverMessages, ...visibleLocalMessages].sort(
				compareMessagesByCreatedAt,
			),
		[serverMessages, visibleLocalMessages],
	);

	const liveAssistantMessage = useMemo<MessageObject | null>(() => {
		if (!activeExchange || !requestAccepted || !canDisplayAssistant(status)) {
			return null;
		}
		if (
			localMessages.some(
				(message) => message.message_id === activeExchange.assistantMessageId,
			)
		) {
			return null;
		}
		const message = buildAssistantMessage({
			exchange: activeExchange,
			status,
			streamingText: assistantStreamingText,
			jobs,
			streamError,
		});
		if (!message) return null;
		const existsOnServer = serverMessages.some((serverMessage) =>
			messagesHaveEquivalentContent(message, serverMessage),
		);
		return existsOnServer ? null : message;
	}, [
		activeExchange,
		requestAccepted,
		status,
		assistantStreamingText,
		jobs,
		streamError,
		localMessages,
		serverMessages,
	]);

	const showLoadingMessages =
		isLoading &&
		serverMessages.length === 0 &&
		visibleLocalMessages.length === 0;
	const showEmptyState =
		!showLoadingMessages &&
		visibleMessages.length === 0 &&
		!liveAssistantMessage;

	return {
		...stream,
		localMessages,
		setLocalMessages,
		activeExchange,
		setActiveExchange,
		terminalAssistantMessage,
		visibleMessages,
		liveAssistantMessage,
		showLoadingMessages,
		showEmptyState,
		welcomeCreatedAt,
	};
}

export type UseChatMessagesReturn = ReturnType<typeof useChatMessages>;
