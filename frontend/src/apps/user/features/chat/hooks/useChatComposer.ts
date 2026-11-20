import { useEffect, useState } from "react";

// Types
import type { MessageObject } from "@/apps/user/features/chat/types";
import type { UseChatMessagesReturn } from "./useChatMessages";

// Services
import { resumeAPI } from "@/apps/user/features/resume/service/resumeService";

// Utils
import {
	createLocalMessageId,
	updateMessageById,
	upsertLocalMessage,
	type ActiveExchange,
} from "@/apps/user/features/chat/utils/chatMessageUtils";
import { getRequiredError, sanitizeText } from "@/shared/lib/formValidation";
import i18n from "@/shared/i18n";

interface UseChatComposerOptions {
	chatId?: string;
	messages: UseChatMessagesReturn;
	focusTextarea: () => void;
	requestAutoScroll: () => void;
}

export function useChatComposer({
	chatId,
	messages,
	focusTextarea,
	requestAutoScroll,
}: UseChatComposerOptions) {
	const [inputData, setInputData] = useState("");
	const [error, setError] = useState("");
	const {
		isBusy,
		sendMessage,
		terminalAssistantMessage,
		setLocalMessages,
		setActiveExchange,
	} = messages;

	useEffect(() => {
		(() => {
			setInputData("");
			setError("");
		})();
	}, [chatId]);

	async function handleSubmit() {
		if (isBusy) {
			setError(i18n.t("chat.busy"));
			return;
		}

		const userContent = sanitizeText(inputData);
		const validationError = getRequiredError(
			userContent,
			i18n.t("chat.messageFieldName"),
		);
		if (validationError) {
			setError(validationError);
			return;
		}

		if (terminalAssistantMessage) {
			setLocalMessages((current) =>
				upsertLocalMessage(current, terminalAssistantMessage),
			);
		}

		const createdAt = new Date().toISOString();
		const nextExchange: ActiveExchange = {
			userMessageId: createLocalMessageId("user"),
			assistantMessageId: createLocalMessageId("assistant"),
			createdAt,
		};
		const userMessage: MessageObject = {
			message_id: nextExchange.userMessageId,
			role: "user",
			content: userContent,
			created_at: createdAt,
			status: "sending",
		};

		setError("");
		setInputData("");
		setActiveExchange(nextExchange);
		setLocalMessages((current) => [...current, userMessage]);
		requestAutoScroll();

		const result = await sendMessage(userContent);
		setLocalMessages((current) => {
			const nextUserState: Partial<MessageObject> =
				result.success || result.accepted
					? { status: "sent", error: undefined }
					: result.stopped
						? { status: "stopped", error: undefined }
						: {
								status: "failed",
								error: result.error ?? i18n.t("chat.sendFailed"),
							};
			return updateMessageById(
				current,
				nextExchange.userMessageId,
				nextUserState,
			);
		});
		if (result.error) setError(result.error);
	}

	async function handleResumeSelect(resumeId: number | string) {
		try {
			const response = await resumeAPI.getResumeById(resumeId);
			const content = response.data.content;
			setInputData((current) =>
				current ? `${current}\n\n${content}` : content,
			);
			setError("");
			requestAnimationFrame(focusTextarea);
		} catch (resumeError) {
			console.error(resumeError);
			setError(i18n.t("chat.resumeUnavailable"));
		}
	}

	return {
		inputData,
		error,
		handleSubmit,
		handleResumeSelect,
		setInputData,
		setError,
	};
}

export type UseChatComposerReturn = ReturnType<typeof useChatComposer>;
