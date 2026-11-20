import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface EmptyStateProps {
	message: string;
	icon?: LucideIcon;
	className?: string;
	dashed?: boolean;
}

export default function EmptyState({
	message,
	icon: Icon,
	className,
	dashed = false,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center",
				dashed && "rounded-lg border border-dashed border-border",
				className,
			)}
			role="status">
			{Icon ? <Icon className="size-8 text-text-muted" aria-hidden="true" /> : null}
			<p className="max-w-md text-text-muted">{message}</p>
		</div>
	);
}
