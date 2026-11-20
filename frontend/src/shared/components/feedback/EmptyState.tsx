import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface EmptyStateProps {
	message: string;
	icon?: LucideIcon;
	className?: string;
}

/** Shared empty state for every list/section page. */
export default function EmptyState({
	message,
	icon: Icon,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center",
				className,
			)}
			role="status">
			{Icon ? (
				<div className="flex size-14 items-center justify-center rounded-full bg-surface">
					<Icon className="size-7 text-text-muted" aria-hidden="true" />
				</div>
			) : null}
			<p className="max-w-md text-text-muted">{message}</p>
		</div>
	);
}
