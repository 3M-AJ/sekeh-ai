import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { AdminTableRowsSkeleton } from "@/shared/components/feedback/Skeleton";

interface AdminTableProps {
	headers: ReactNode;
	children: ReactNode;
	isPending?: boolean;
	empty?: ReactNode;
	columns?: number;
	hideOnMobile?: number[];
	className?: string;
}

export default function AdminTable({
	headers,
	children,
	isPending = false,
	empty,
	columns = 6,
	hideOnMobile = [1, 2, 4],
	className,
}: AdminTableProps) {
	return (
		<div
			className={cn(
				"min-h-0 flex-1 overflow-auto rounded-lg border border-border scrollbar-gray",
				className,
			)}>
			<table className="w-full text-sm">
				<thead className="bg-surface text-primary-action">
					<tr>{headers}</tr>
				</thead>
				<tbody
					aria-busy={isPending || undefined}
					aria-label={isPending ? "Loading table" : undefined}>
					{isPending ? (
						<AdminTableRowsSkeleton
							rows={6}
							columns={columns}
							hideOnMobile={hideOnMobile}
						/>
					) : (
						<>
							{children}
							{empty}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}
