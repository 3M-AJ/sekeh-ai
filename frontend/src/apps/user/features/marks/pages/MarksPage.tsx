import { BookmarkCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import JobCard from "@/shared/components/jobs/JobCard";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import EmptyState from "@/shared/components/feedback/EmptyState";
import { JobGridSkeleton } from "@/shared/components/feedback/Skeleton";

// Hooks
import { useMarksPage } from "@/apps/user/features/marks/hooks/useMarksPage";

export default function MarksPage() {
	const { t } = useTranslation("common");
	const { all, isPending } = useMarksPage();

	return (
		<Section
			title={
				<PageTitle
					icon={BookmarkCheck}
					title={t("marks.title")}
					desc={t("marks.description")}
				/>
			}>
			{isPending ? (
				<JobGridSkeleton />
			) : all.length === 0 ? (
				<EmptyState message={t("marks.empty")} icon={BookmarkCheck} />
			) : (
				<div className="grid w-full grid-cols-4 gap-5 max-md:grid-cols-1">
					{all.map((j) => (
						<JobCard
							{...j}
							key={`marked-${j.job_url}`}
							jobFetchKey="allMarked"
							bookmarked
						/>
					))}
				</div>
			)}
		</Section>
	);
}
