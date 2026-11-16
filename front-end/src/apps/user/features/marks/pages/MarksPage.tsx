import { BookmarkCheck } from "lucide-react";

// Components
import JobCard from "@/shared/components/jobs/JobCard";
import PageTitle from "@/shared/components/layout/PageTitle";

// Hooks
import { useMarksPage } from "@/apps/user/features/marks/hooks/useMarksPage";

export default function MarksPage() {
	const { all } = useMarksPage();

	if (all.length == 0)
		return (
			<div className="flex flex-col gap-6 w-full h-full p-7">
				<PageTitle
					icon={BookmarkCheck}
					title="شغل‌های ذخیره‌شده"
					desc="شغل‌های مورد علاقه‌تان را مدیریت کنید."
				/>

				<div className="flex items-center justify-center flex-1">
					<p className="text-text-muted max-w-2/3 text-center">
						برای ذخیره کردن کارت مشاغل، از صفحه چت اقدام کنید.
					</p>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col gap-6 h-full p-7 overflow-y-auto w-full">
			<PageTitle
				icon={BookmarkCheck}
				title="شغل‌های ذخیره‌شده"
				desc="شغل‌های مورد علاقه‌تان را مدیریت کنید."
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
