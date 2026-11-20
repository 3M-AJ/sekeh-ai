import { Link } from "react-router";

// Types
import type { ChatObject } from "@/apps/user/features/chat/types";

// Components
import EditDialog from "@/apps/user/features/chat/components/EditChatDialog";
import DeleteDialog from "@/apps/user/features/chat/components/DeleteChatDialog";

// Utils
import { formatDate } from "@/shared/lib/date";

export default function ChatHistoryCard({ card }: { card: ChatObject }) {
	return (
		<div className="group relative h-70 w-full rounded-lg border border-border bg-background transition-colors duration-150 hover:border-accent-hover">
			<span className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-linear-30 from-accent/20 to-primary-green/20 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
			<div className="relative z-1 flex size-full flex-col justify-between">
				<Link
					to={`${card.chat_id}`}
					className="flex size-full flex-col gap-5 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent">
					<p className="truncate text-xl font-semibold text-primary-text">
						{card.title}
					</p>
				</Link>
				<div className="flex items-center justify-between p-3">
					<div className="flex items-center gap-2">
						<EditDialog id={card.chat_id} />
						<DeleteDialog id={card.chat_id} />
					</div>
					<p dir="ltr" className="text-xs font-medium text-text-muted">
						{formatDate(card.created_at)}
					</p>
				</div>
			</div>
		</div>
	);
}
