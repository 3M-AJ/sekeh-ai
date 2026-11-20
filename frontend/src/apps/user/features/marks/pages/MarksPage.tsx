import { BookmarkCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import JobCard from "@/shared/components/jobs/JobCard";
import PageTitle from "@/shared/components/layout/PageTitle";

// Hooks
import { useMarksPage } from "@/apps/user/features/marks/hooks/useMarksPage";

export default function MarksPage() {
	const { t } = useTranslation("common");
	const { all } = useMarksPage();

	if (all.length == 0)
		return (
			<div className="flex flex-col gap-6 w-full h-full p-7">
				<PageTitle
					icon={BookmarkCheck}
					title={t("marks.title")}
					desc={t("marks.description")}
				/>

				<div className="flex items-center justify-center flex-1">
					<p className="text-text-muted max-w-2/3 text-center">
						{t("marks.empty")}
					</p>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col gap-6 h-full p-7 overflow-y-auto w-full">
			<PageTitle
				icon={BookmarkCheck}
				title={t("marks.title")}
				desc={t("marks.description")}
			/>

			<div className="grid grid-cols-4 max-md:grid-cols-1 gap-5 w-full">
				{all.map((j) => (
					<JobCard
						{...j}
						key={`marked-${j.job_url}`}
						jobFetchKey="allMarked"
						bookmarked
					/>
				))}
			</div>
		</div>
	);
}
