import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface DialogIconTriggerProps {
	icon: ReactNode;
	label: string;
	variant?: "destructive" | "primary";
	className?: string;
	onClick?: () => void;
}

export default function DialogIconTrigger({
	icon,
	label,
	variant = "primary",
	className,
	onClick,
}: DialogIconTriggerProps) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className={cn(
				"inline-flex size-7 cursor-pointer items-center justify-center rounded-full border-2 bg-background p-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
				variant === "destructive"
					? "border-primary-red text-primary-red hover:bg-primary-red hover:text-on-accent"
					: "border-primary-action text-primary-action hover:bg-primary-action hover:text-on-accent",
				className,
			)}>
			<span className="size-full [&_svg]:size-full">{icon}</span>
		</button>
	);
}
