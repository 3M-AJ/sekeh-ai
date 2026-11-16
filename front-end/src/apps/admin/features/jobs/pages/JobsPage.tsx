import { Briefcase } from "lucide-react";

// Components
import EditJobDialog from "@/apps/admin/features/jobs/components/EditJobDialog";
import DeleteJobDialog from "@/apps/admin/features/jobs/components/DeleteJobDialog";
import PageTitle from "@/shared/components/layout/PageTitle";
import Pagination from "@/shared/components/ui/Pagination";

// Hooks
import { useJobsPage } from "@/apps/admin/features/jobs/hooks/useJobsPage";

export default function AdminJobsPage() {
	const {
		search,
		setPage,
		handleSearchChange,
		handleDeleted,
		data,
		jobs,
		isPending,
	} = useJobsPage();

	return (
		<div className="p-7 max-md:p-4 w-full flex flex-col gap-5 h-full overflow-hidden">
			<header className="flex flex-col gap-4">
				<PageTitle
					icon={Briefcase}
					title="مدیریت مشاغل"
					desc="لیست مشاغل را مرور، ویرایش یا حذف کنید."
				/>
				<div className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-stretch">
					<input
						value={search}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder="جستجو بر اساس عنوان، شرکت یا متن..."
						className="border-2 border-border rounded-md h-10 px-3 w-72 max-md:w-full outline-0
					focus:border-accent transition-all duration-150 text-[15px]"
					/>
				</div>
			</header>

			<div className="rounded-lg border-2 border-border overflow-auto scrollbar-gray">
				<table className="w-full text-[14px]">
					<thead className="bg-surface text-primary-action">
						<tr>
							<th className="text-right p-3 font-semibold">عنوان</th>
							<th className="text-right p-3 font-semibold max-md:hidden">
								شرکت
							</th>
							<th className="text-right p-3 font-semibold max-md:hidden">
								مکان
							</th>
							<th className="text-right p-3 font-semibold max-md:hidden">
								منبع
							</th>
							<th className="text-right p-3 font-semibold">امبدینگ</th>
							<th className="text-right p-3 font-semibold"></th>
						</tr>
					</thead>
					<tbody>
						{isPending
							? Array(6)
									.fill("")
									.map((_, i) => (
										<tr key={i} className="border-t border-border">
											<td colSpan={6} className="p-3">
												<div className="h-5 w-full bg-border/70 rounded animate-pulse"></div>
											</td>
										</tr>
									))
							: jobs.map((j) => (
									<tr
										key={j.job_id}
										className="border-t border-border hover:bg-surface/50 transition-all duration-150">
										<td className="p-3 text-primary-text font-medium">
											{j.job_title ?? "—"}
										</td>
										<td className="p-3 text-text-muted max-md:hidden">
											{j.company_name ?? "—"}
										</td>
										<td className="p-3 text-text-muted max-md:hidden">
											{j.location ?? "—"}
										</td>
										<td className="p-3 text-text-muted max-md:hidden">
											{j.source_site ?? "—"}
										</td>
										<td className="p-3">
											<span
												className={`px-2 py-0.5 rounded-full text-[12px] font-semibold
												${j.has_embedding ? "bg-match-soft text-match" : "bg-primary-red/10 text-primary-red"}`}>
												{j.has_embedding ? "بله" : "خیر"}
											</span>
										</td>
										<td className="p-3 flex items-center gap-2">
											<EditJobDialog job={j} />
											<DeleteJobDialog
												id={j.job_id}
												title={j.job_title ?? j.job_url}
												onDeleted={handleDeleted}
											/>
										</td>
									</tr>
								))}

						{!isPending && jobs.length === 0 && (
							<tr>
								<td colSpan={6} className="p-6 text-center text-text-muted">
									شغلی یافت نشد.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{data?.data && (
				<Pagination
					page={data.data.page}
					pages={data.data.pages}
					onChange={setPage}
				/>
			)}
		</div>
	);
}
