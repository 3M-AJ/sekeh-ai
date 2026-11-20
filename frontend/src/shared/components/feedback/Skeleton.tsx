import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface SkeletonProps {
	className?: string;
}

/** Base pulse block. Compose into layout-specific skeletons. */
export function Skeleton({ className }: SkeletonProps) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-border/70", className)}
			aria-hidden="true"
		/>
	);
}

interface SkeletonGroupProps {
	children: ReactNode;
	className?: string;
	label?: string;
}

export function SkeletonGroup({
	children,
	className,
	label = "Loading",
}: SkeletonGroupProps) {
	return (
		<div
			className={className}
			role="status"
			aria-live="polite"
			aria-busy="true"
			aria-label={label}>
			{children}
		</div>
	);
}

/** Resume list row: title, content lines, action chips. */
export function ResumeCardSkeleton() {
	return (
		<div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4">
			<div className="flex flex-col gap-2">
				<Skeleton className="h-5 w-1/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
				<Skeleton className="h-4 w-2/3" />
			</div>
			<div className="flex gap-2">
				<Skeleton className="h-9 w-24 rounded-full" />
				<Skeleton className="size-7 rounded-full" />
			</div>
		</div>
	);
}

export function ResumeListSkeleton({
	count = 3,
	compact = false,
}: {
	count?: number;
	/** Picker-style cards without action chips */
	compact?: boolean;
}) {
	return (
		<SkeletonGroup className="flex flex-col gap-3" label="Loading resumes">
			{Array.from({ length: count }).map((_, i) =>
				compact ? (
					<div
						key={i}
						className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
						<Skeleton className="h-5 w-1/2" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</div>
				) : (
					<ResumeCardSkeleton key={i} />
				),
			)}
		</SkeletonGroup>
	);
}

/** Chat history card: tall card with title + footer actions/date. */
export function ChatHistoryCardSkeleton() {
	return (
		<div className="flex h-70 w-full flex-col justify-between rounded-lg border border-border bg-background p-3">
			<Skeleton className="h-7 w-3/4" />
			<div className="flex items-center justify-between">
				<div className="flex gap-2">
					<Skeleton className="size-7 rounded-full" />
					<Skeleton className="size-7 rounded-full" />
				</div>
				<Skeleton className="h-3 w-20" />
			</div>
		</div>
	);
}

export function ChatHistoryGridSkeleton({ count = 10 }: { count?: number }) {
	return (
		<SkeletonGroup
			className="grid grid-cols-5 gap-5 max-[1100px]:grid-cols-3 max-md:grid-cols-1"
			label="Loading chats">
			{Array.from({ length: count }).map((_, i) => (
				<ChatHistoryCardSkeleton key={i} />
			))}
		</SkeletonGroup>
	);
}

/** Job card: match circle, title/company, requirements, action row. */
export function JobCardSkeleton() {
	return (
		<div className="flex h-75 w-full flex-col justify-between gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2">
			<div className="flex items-center gap-4">
				<Skeleton className="size-14 shrink-0 rounded-full" />
				<div className="flex w-full flex-col gap-2">
					<Skeleton className="h-5 w-4/5" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-2 pt-2">
				<Skeleton className="h-4 w-1/3" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-5/6" />
				<Skeleton className="h-3 w-3/4" />
			</div>
			<div className="flex h-7 items-center gap-4">
				<Skeleton className="h-full w-full rounded-full" />
				<Skeleton className="h-full w-full rounded-full" />
				<Skeleton className="size-5 shrink-0 rounded-full" />
			</div>
		</div>
	);
}

export function JobGridSkeleton({
	count = 4,
	className,
}: {
	count?: number;
	className?: string;
}) {
	return (
		<SkeletonGroup
			className={cn(
				"grid w-full grid-cols-4 gap-5 max-md:grid-cols-1",
				className,
			)}
			label="Loading jobs">
			{Array.from({ length: count }).map((_, i) => (
				<JobCardSkeleton key={i} />
			))}
		</SkeletonGroup>
	);
}

/** Admin dashboard stat tiles. */
export function DashboardStatsSkeleton({ count = 4 }: { count?: number }) {
	return (
		<SkeletonGroup
			className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1"
			label="Loading stats">
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="flex flex-col gap-2 rounded-lg border border-border bg-background p-5">
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-9 w-1/3" />
				</div>
			))}
		</SkeletonGroup>
	);
}

/** Admin table body rows with cell-shaped blocks. */
export function AdminTableRowsSkeleton({
	rows = 6,
	columns = 6,
	hideOnMobile = [],
}: {
	rows?: number;
	columns?: number;
	hideOnMobile?: number[];
}) {
	return (
		<>
			{Array.from({ length: rows }).map((_, row) => (
				<tr key={row} className="border-t border-border">
					{Array.from({ length: columns }).map((_, col) => (
						<td
							key={col}
							className={cn(
								"p-3",
								hideOnMobile.includes(col) && "max-md:hidden",
							)}>
							<Skeleton
								className={cn(
									"h-5",
									col === columns - 1 ? "size-7 rounded-full" : "w-full max-w-40",
								)}
							/>
						</td>
					))}
				</tr>
			))}
		</>
	);
}

/** Chat message bubbles while history loads. */
export function ChatMessagesSkeleton() {
	return (
		<SkeletonGroup className="flex flex-col gap-10" label="Loading messages">
			<div className="flex justify-start">
				<div className="flex w-full max-w-[85%] flex-col gap-2">
					<Skeleton className="h-24 w-full rounded-xl" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
			<div className="flex justify-end">
				<div className="flex w-full max-w-[70%] flex-col items-end gap-2">
					<Skeleton className="h-16 w-full rounded-xl" />
					<Skeleton className="h-3 w-20" />
				</div>
			</div>
			<div className="flex justify-start">
				<div className="flex w-full max-w-[80%] flex-col gap-2">
					<Skeleton className="h-28 w-full rounded-xl" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
		</SkeletonGroup>
	);
}

/** Profile header + info card. */
export function ProfileSkeleton() {
	return (
		<SkeletonGroup
			className="flex flex-col gap-8 max-md:items-center"
			label="Loading profile">
			<div className="flex items-center gap-5 max-md:flex-col">
				<Skeleton className="size-27 shrink-0 rounded-full" />
				<Skeleton className="h-10 w-48" />
			</div>
			<div className="flex w-full max-w-md flex-col gap-5 rounded-lg border border-border bg-background p-5">
				<div className="flex gap-3">
					<Skeleton className="h-6 w-28" />
					<Skeleton className="h-6 flex-1" />
				</div>
				<div className="flex gap-3">
					<Skeleton className="h-6 w-28" />
					<Skeleton className="h-6 w-40" />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-4 w-36" />
			</div>
		</SkeletonGroup>
	);
}
