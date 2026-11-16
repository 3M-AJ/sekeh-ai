import type { FormEvent } from "react";
import { Link } from "react-router";
import { Send, Square } from "lucide-react";

// Components
import Message from "@/apps/user/features/chat/components/ChatMessage";
import ResumeModal from "@/apps/user/features/resume/components/ResumePickerDialog";

// Hooks
import { useChatPage } from "@/apps/user/features/chat/hooks";

export default function ChatPage() {
	const {
		messagesContainerRef,
		handleMessagesScroll,
		showLoadingMessages,
		showEmptyState,
		welcomeCreatedAt,
		visibleMessages,
		liveAssistantMessage,
		bottomRef,
		handleSubmit,
		textareaRef,
		inputData,
		setInputData,
		error,
		setError,
		isBusy,
		handleResumeSelect,
		abort,
	} = useChatPage();

	return (
		<div className="relative flex h-full flex-col">
			<menu className="flex flex-col items-start gap-1 max-md:pb-1 max-md:ps-3 max-md:pt-5 md:absolute md:start-5 md:top-5">
				<Link
					to="/chats"
					className="group flex items-center justify-center gap-1 rounded-lg border-2 border-primary-action bg-surface px-3 py-0.5 transition-all duration-150 hover:bg-primary-action">
					<p className="text-[14px] font-semibold text-primary-action transition-all duration-150 group-hover:text-background">
						بازگشت
					</p>
				</Link>
			</menu>

			<div
				ref={messagesContainerRef}
				dir="ltr"
				onScroll={handleMessagesScroll}
				className="scrollbar-gray flex h-full flex-col gap-10 overflow-y-auto px-5 pb-5 max-md:pt-5 md:px-[20%] md:pt-10">
				{showLoadingMessages ? (
					<div className="space-y-4">
						<div className="h-24 animate-pulse rounded-xl bg-border/70" />
						<div className="h-24 animate-pulse rounded-xl bg-border/70" />
					</div>
				) : null}
				{showEmptyState ? (
					<Message
						message={{
							message_id: "welcome-message",
							role: "assistant",
							content:
								"سلام!\n\nمن **سکه** (سـامانه کـاریابی هـوشمند) هستم.\n\nرزومه خودت رو برام بفرست تا ببینم چی کار میتونم بکنم.",
							created_at: welcomeCreatedAt,
							status: "sent",
						}}
					/>
				) : null}
				{visibleMessages.map((message) => (
					<Message key={message.message_id} message={message} />
				))}
				{liveAssistantMessage ? (
					<Message
						key={liveAssistantMessage.message_id}
						message={liveAssistantMessage}
					/>
				) : null}
				<div ref={bottomRef} />
			</div>

			<form
				id="chat-input"
				onSubmit={(event: FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					void handleSubmit();
				}}
				className="mx-5 mb-5 mt-2 rounded-xl border border-border bg-background p-3 shadow-lg shadow-border transition-all duration-150 md:mx-75">
				<div dir="rtl" className="flex items-end gap-2.5">
					<textarea
						ref={textareaRef}
						rows={1}
						value={inputData}
						disabled={isBusy}
						placeholder="درمورد خودت بنویس..."
						onChange={(event) => {
							setInputData(event.target.value);
							if (error) setError("");
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter" && !event.shiftKey) {
								event.preventDefault();
								if (!isBusy) void handleSubmit();
							}
						}}
						className="h-auto min-h-10 w-full resize-none overflow-hidden rounded-lg px-2 py-2 text-[17px] text-primary-text outline-0 placeholder:font-medium placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-60"
					/>
					<div className="flex shrink-0 items-center gap-2">
						<ResumeModal onSelectResume={handleResumeSelect} />
						<button
							form="chat-input"
							type={isBusy ? "button" : "submit"}
							onClick={() => {
								if (isBusy) abort();
							}}
							aria-label={isBusy ? "توقف تولید پاسخ" : "ارسال پیام"}
							className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-accent transition-all duration-150 hover:bg-accent-hover">
							{isBusy ? (
								<Square strokeWidth={1.5} className="size-4 text-white" />
							) : (
								<Send
									id="sendIcon"
									strokeWidth={1.5}
									className="me-px mt-0.5 size-4 -rotate-90 text-white"
								/>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
