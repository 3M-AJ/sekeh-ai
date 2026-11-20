import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import EditJobDialog from "@/apps/admin/features/jobs/components/EditJobDialog";
import DeleteJobDialog from "@/apps/admin/features/jobs/components/DeleteJobDialog";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import AdminTable from "@/shared/components/layout/AdminTable";
import Pagination from "@/shared/components/ui/Pagination";
import Input from "@/shared/components/ui/Input";
import EmptyState from "@/shared/components/feedback/EmptyState";

// Hooks
import { useJobsPage } from "@/apps/admin/features/jobs/hooks/useJobsPage";

export default function AdminJobsPage() {
	const { t } = useTranslation("common");
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
		<Section
			className="overflow-hidden"
			title={
				<PageTitle
					icon={Briefcase}
					title={t("admin.jobsTitle")}
					desc={t("admin.jobsDescription")}
				/>
			}
			header={
				<Input
					value={search}
					onChange={(e) => handleSearchChange(e.target.value)}
					placeholder={t("admin.jobsSearchPlaceholder")}
					className="w-72 max-md:w-full"
					aria-label={t("admin.jobsSearchPlaceholder")}
				/>
			}>
			<AdminTable
				isPending={isPending}
				hideOnMobile={[1, 2, 3]}
				headers={
					<>
						<th className="p-3 text-end font-semibold">
							{t("admin.columnTitle")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnCompany")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnLocation")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnSource")}
						</th>
						<th className="p-3 text-end font-semibold">
							{t("admin.columnEmbedding")}
						</th>
						<th className="p-3 text-end font-semibold" />
					</>
				}
				empty={
					!isPending && jobs.length === 0 ? (
						<tr>
							<td colSpan={6}>
								<EmptyState
									message={t("admin.jobsEmpty")}
									icon={Briefcase}
									className="py-12"
								/>
							</td>
						</tr>
					) : null
				}>
				{jobs.map((j) => (
					<tr
						key={j.job_id}
						className="border-t border-border transition-colors duration-150 hover:bg-surface/50">
						<td className="p-3 font-medium text-primary-text">
							{j.job_title ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{j.company_name ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{j.location ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{j.source_site ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3">
							<span
								className={
									j.has_embedding
										? "rounded-full bg-match-soft px-2 py-0.5 text-xs font-semibold text-match"
										: "rounded-full bg-primary-red/10 px-2 py-0.5 text-xs font-semibold text-primary-red"
								}>
								{j.has_embedding
									? t("admin.hasEmbeddingYes")
									: t("admin.hasEmbeddingNo")}
							</span>
						</td>
						<td className="flex items-center gap-2 p-3">
							<EditJobDialog job={j} />
							<DeleteJobDialog
								id={j.job_id}
								title={j.job_title ?? j.job_url}
								onDeleted={handleDeleted}
							/>
						</td>
					</tr>
				))}
			</AdminTable>

			{data?.data && (
				<Pagination
					page={data.data.page}
					pages={data.data.pages}
					onChange={setPage}
				/>
			)}
		</Section>
	);
}
