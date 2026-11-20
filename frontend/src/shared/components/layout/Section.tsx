import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface SectionProps {
	title: ReactNode;
	header?: ReactNode;
	children: ReactNode;
	className?: string;
}

export default function Section({
	title,
	header,
	children,
	className,
}: SectionProps) {
	return (
		<div
			className={cn(
				"flex h-full w-full flex-col gap-6 overflow-y-auto scrollbar-gray md:p-7 max-md:px-6 max-md:py-5",
				className,
			)}>
			<header className="flex shrink-0 justify-between gap-4 max-md:flex-col max-md:items-start md:items-center">
				{title}
				{header ? (
					<div className="flex flex-wrap items-center gap-2 max-md:w-full">
						{header}
					</div>
				) : null}
			</header>
			<div className="flex min-h-0 flex-1 flex-col gap-4">{children}</div>
		</div>
	);
}
