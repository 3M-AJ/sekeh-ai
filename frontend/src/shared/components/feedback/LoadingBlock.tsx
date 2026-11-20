import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface LoadingBlockProps {
	className?: string;
	variant?: "spinner" | "pulse";
	count?: number;
	pulseClassName?: string;
}

export default function LoadingBlock({
	className,
	variant = "spinner",
	count = 1,
	pulseClassName,
}: LoadingBlockProps) {
	if (variant === "pulse") {
		return (
			<div className={cn("flex flex-col gap-3", className)} aria-hidden="true">
				{Array.from({ length: count }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"h-10 w-full animate-pulse rounded-lg bg-border/70",
							pulseClassName,
						)}
					/>
				))}
			</div>
		);
	}

	return (
		<div
			className={cn("flex items-center justify-center py-10", className)}
			role="status"
			aria-live="polite">
			<LoaderCircle className="size-6 animate-spin text-accent" />
		</div>
	);
}
