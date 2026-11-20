import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

interface GrowableButtonProps extends ComponentProps<"button"> {
	label: string;
	icon: React.ReactNode;
	variant?: "destructive" | "primary";
}

export default function GrowableButton({
	label,
	icon,
	variant = "primary",
	className,
	type = "button",
	...rest
}: GrowableButtonProps) {
	return (
		<button
			type={type}
			aria-label={label}
			className={cn(
				"group flex h-10 w-10 cursor-pointer items-center justify-end overflow-hidden rounded-full border-2 bg-surface transition-all duration-200 ease-in-out hover:w-auto focus-visible:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
				variant === "destructive"
					? "border-primary-red hover:bg-primary-red"
					: "border-primary-action hover:bg-primary-action",
				className,
			)}
			{...rest}>
			<div className="flex min-w-max items-center justify-center gap-2 px-2">
				<span
					className="max-w-0 whitespace-nowrap pe-0 font-medium text-on-accent opacity-0 transition-all duration-200 ease-in-out group-hover:max-w-xs group-hover:pe-2 group-hover:opacity-100 group-focus-visible:max-w-xs group-focus-visible:pe-2 group-focus-visible:opacity-100">
					{label}
				</span>
				{icon}
			</div>
		</button>
	);
}
