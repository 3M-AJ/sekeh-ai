import {
	useCallback,
	useEffect,
	useRef,
	type RefObject,
	type MutableRefObject,
} from "react";

interface UseChatScrollOptions {
	chatId?: string;
	inputData: string;
	visibleMessageCount: number;
	liveAssistantContent?: string;
	liveAssistantJobCount?: number;
	isStreaming: boolean;
	textareaRef: RefObject<HTMLTextAreaElement | null>;
	shouldAutoScrollRef: MutableRefObject<boolean>;
}

export function useChatScroll({
	chatId,
	inputData,
	visibleMessageCount,
	liveAssistantContent,
	liveAssistantJobCount,
	isStreaming,
	textareaRef,
	shouldAutoScrollRef,
}: UseChatScrollOptions) {
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const requestAutoScroll = useCallback(() => {
		shouldAutoScrollRef.current = true;
	}, [shouldAutoScrollRef]);

	useEffect(() => {
		shouldAutoScrollRef.current = true;
	}, [chatId, shouldAutoScrollRef]);

	useEffect(() => {
		if (!shouldAutoScrollRef.current) return;
		bottomRef.current?.scrollIntoView({
			behavior: isStreaming ? "auto" : "smooth",
			block: "end",
		});
	}, [
		visibleMessageCount,
		liveAssistantContent,
		liveAssistantJobCount,
		isStreaming,
		shouldAutoScrollRef,
	]);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;
		textarea.style.height = "auto";
		const parsedLineHeight = Number.parseFloat(
			getComputedStyle(textarea).lineHeight,
		);
		const lineHeight = Number.isFinite(parsedLineHeight)
			? parsedLineHeight
			: 24;
		const maxHeight = lineHeight * 5;
		textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
		textarea.style.overflowY =
			textarea.scrollHeight > maxHeight ? "auto" : "hidden";
	}, [inputData, textareaRef]);

	function handleMessagesScroll() {
		const container = messagesContainerRef.current;
		if (!container) return;
		const distanceFromBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight;
		shouldAutoScrollRef.current = distanceFromBottom < 120;
	}

	return {
		messagesContainerRef,
		bottomRef,
		textareaRef,
		shouldAutoScrollRef,
		handleMessagesScroll,
		requestAutoScroll,
	};
}

export type UseChatScrollReturn = ReturnType<typeof useChatScroll>;
