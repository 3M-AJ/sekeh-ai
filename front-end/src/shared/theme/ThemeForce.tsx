import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/shared/lib/cn";
import type { ResolvedTheme } from "./types";

interface ThemeForceProps extends HTMLAttributes<HTMLDivElement> {
	theme: ResolvedTheme;
}

export default function ThemeForce({
	theme,
	className,
	children,
	style,
	...props
}: PropsWithChildren<ThemeForceProps>) {
	return (
		<div
			className={cn(theme === "dark" ? "dark" : "light", className)}
			data-theme={theme}
			style={{ colorScheme: theme, ...style }}
			{...props}>
			{children}
		</div>
	);
}
