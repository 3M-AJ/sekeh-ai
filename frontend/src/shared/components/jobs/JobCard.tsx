import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// Types
import type { Job } from "@/shared/types";

// Services
import { MarkAPI } from "@/apps/user/features/marks/service/marksService";

// Components
import MatchCircle from "@/shared/components/jobs/MatchCircle";
import Button from "@/shared/components/ui/Button";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { toast } from "@/shared/lib/toast";
import { cn } from "@/shared/lib/cn";

interface JobCardProps extends Job {
	bookmarked?: boolean;
	jobFetchKey?: string;
}

export default function JobCard(props: JobCardProps) {
	const { t } = useTranslation("common");
	const [showDetails, setShowDetails] = useState(false);
	const [saved, setSaved] = useState(props.bookmarked ?? false);
	const queryClient = useQueryClient();
	const { markCard } = MarkAPI;
	const { mutate: mark } = useCustomMutation(markCard, {
		onSuccess: (data) => {
			if (!data.data.bookmarked)
				toast.success(t("toasts:marks.success.removed"));
			else toast.success(t("toasts:marks.success.saved"));
			setSaved((prev) => !prev);
			if (props.jobFetchKey)
				queryClient.refetchQueries({ queryKey: [props.jobFetchKey] });
		},
	});

	return (
		<div className="flex h-75 w-full flex-col justify-between gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2">
			<div className="flex items-center gap-4">
				<div className="w-14 shrink-0">
					<MatchCircle percentage={props.match_percent} />
				</div>
				<div className="flex flex-col gap-0.5">
					<h2 className="text-base font-bold text-primary-text">
						{props.job_title}
					</h2>
					<p className="text-sm text-text-muted">
						<span className="line-clamp-2">{props.company_name}</span>
						{" · "}
						<span>{props.source_site}</span>
					</p>
				</div>
			</div>
			{showDetails ? (
				<DetailsView
					paycheck={props.paycheck ?? undefined}
					company_name={props.company_name}
					source_site={props.source_site}
					company_reviews={props.company_reviews ?? undefined}
				/>
			) : (
				<OverView requirements={props.requirements} />
			)}

			<div className="flex h-7 shrink-0 items-center justify-between gap-4 text-xs">
				<Button
					onClick={() => setShowDetails((prev) => !prev)}
					disabled={!props.company_reviews && !props.paycheck}
					className="h-full w-full rounded-full text-xs">
					{showDetails ? t("jobs.back") : t("jobs.details")}
				</Button>

				<Button
					variant="outline"
					onClick={() =>
						window.open(props.job_url, "_blank", "noopener,noreferrer")
					}
					className="h-full w-full rounded-full text-xs">
					{t("jobs.link")}
				</Button>

				<button
					type="button"
					onClick={() => mark(props)}
					aria-label={t("jobs.bookmark", { defaultValue: "Bookmark job" })}
					aria-pressed={saved}
					className="cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
					<Bookmark
						strokeWidth={1.5}
						className={cn(
							"size-5 text-primary-action",
							saved && "fill-primary-action/60",
						)}
					/>
				</button>
			</div>
		</div>
	);
}

interface DetailsViewProps {
	company_name: string;
	source_site: string;
	company_reviews?: { rating: number; count: number };
	paycheck?: string;
}

function DetailsView({
	company_name,
	source_site,
	paycheck,
	company_reviews,
}: DetailsViewProps) {
	const { t } = useTranslation("common");

	return (
		<div className="flex h-full flex-col justify-start gap-2.5 overflow-auto text-sm text-primary-text *:not-first:ps-5">
			<h3 className="text-sm font-medium text-text-muted">
				{t("jobs.detailsHeading")}
			</h3>

			<div className="grid grid-cols-[1fr_2fr] gap-3">
				{!!company_name && (
					<>
						<span className="text-nowrap text-text-muted">
							{t("jobs.company")}
						</span>
						<span className="line-clamp-2 text-end font-semibold">
							{company_name}
						</span>
					</>
				)}
				{!!source_site && (
					<>
						<span className="text-nowrap text-text-muted">
							{t("jobs.source")}
						</span>
						<span className="text-end font-semibold">{source_site}</span>
					</>
				)}
				{!!paycheck && (
					<>
						<span className="text-nowrap text-text-muted">
							{t("jobs.salaryRange")}
						</span>
						<span className="text-end font-semibold">{paycheck}</span>
					</>
				)}
				{!!company_reviews && (
					<>
						<span className="text-text-muted">{t("jobs.reviews")}</span>
						<span className="text-end font-semibold">
							{company_reviews.rating.toFixed(1)} ⭐{" "}
							{company_reviews.count ? (
								<span className="font-normal text-text-muted">
									{t("jobs.reviewParticipants", {
										count: company_reviews.count,
									})}
								</span>
							) : null}
						</span>
					</>
				)}
			</div>
		</div>
	);
}

interface OverViewProps {
	requirements: string[];
}

function OverView({ requirements }: OverViewProps) {
	const { t } = useTranslation("common");

	return (
		<div className="flex h-full flex-col justify-start gap-2.5">
			<div className="h-full text-sm">
				<p className="font-medium text-text-muted">{t("jobs.requirements")}</p>
				<ul className="flex max-h-full list-disc flex-col gap-1 overflow-y-auto ps-8 text-primary-text">
					{requirements.map((requirement) => (
						<li key={requirement}>{requirement}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
