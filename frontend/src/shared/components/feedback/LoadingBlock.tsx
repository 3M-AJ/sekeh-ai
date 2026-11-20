import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface LoadingBlockProps {
	className?: string;
}

/** Compact spinner for inline/dialog loading. Prefer layout skeletons for pages. */
export default function LoadingBlock({ className }: LoadingBlockProps) {
	return (
		<div
			className={cn("flex items-center justify-center py-10", className)}
			role="status"
			aria-live="polite">
			<LoaderCircle className="size-6 animate-spin text-accent" />
		</div>
	);
}
