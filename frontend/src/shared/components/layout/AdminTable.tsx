import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import LoadingBlock from "@/shared/components/feedback/LoadingBlock";

interface AdminTableProps {
	headers: ReactNode;
	children: ReactNode;
	isPending?: boolean;
	empty?: ReactNode;
	colSpan?: number;
	className?: string;
}

export default function AdminTable({
	headers,
	children,
	isPending = false,
	empty,
	colSpan = 6,
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
				<tbody>
					{isPending ? (
						Array.from({ length: 6 }).map((_, i) => (
							<tr key={i} className="border-t border-border">
								<td colSpan={colSpan} className="p-3">
									<LoadingBlock
										variant="pulse"
										count={1}
										pulseClassName="h-5"
										className="gap-0"
									/>
								</td>
							</tr>
						))
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
