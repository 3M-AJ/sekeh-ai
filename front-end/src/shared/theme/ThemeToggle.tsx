import { Moon, Sun } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { useTheme } from "./ThemeContext";

type ThemeToggleProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"children" | "onClick" | "type"
>;

export default function ThemeToggle({ className, ...props }: ThemeToggleProps) {
	const { isDark, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
			title={isDark ? "حالت روشن" : "حالت تاریک"}
			className={cn(
				"inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-primary-action transition-colors hover:bg-surface hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
				className,
			)}
			{...props}>
			{isDark ? (
				<Sun strokeWidth={1.75} className="size-4.5" />
			) : (
				<Moon strokeWidth={1.75} className="size-4.5" />
			)}
		</button>
	);
}
