import { useRef } from "react";
import { useParams } from "react-router";

import { useChatComposer } from "./useChatComposer";
import { useChatMessages } from "./useChatMessages";
import { useChatScroll } from "./useChatScroll";

export function useChatPage() {
	const { chatId } = useParams();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const shouldAutoScrollRef = useRef(true);
	const messages = useChatMessages(chatId);
	const composer = useChatComposer({
		chatId,
		messages,
		focusTextarea: () => textareaRef.current?.focus(),
		requestAutoScroll: () => {
			shouldAutoScrollRef.current = true;
		},
	});
	const scroll = useChatScroll({
		chatId,
		inputData: composer.inputData,
		visibleMessageCount: messages.visibleMessages.length,
		liveAssistantContent: messages.liveAssistantMessage?.content,
		liveAssistantJobCount: messages.liveAssistantMessage?.job_cards?.length,
		isStreaming: messages.isStreaming,
		textareaRef,
		shouldAutoScrollRef,
	});

	return {
		...messages,
		...composer,
		...scroll,
	};
}

export type UseChatPageReturn = ReturnType<typeof useChatPage>;
