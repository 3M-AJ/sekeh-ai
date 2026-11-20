import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import DeleteUserDialog from "@/apps/admin/features/users/components/DeleteUserDialog";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import AdminTable from "@/shared/components/layout/AdminTable";
import Pagination from "@/shared/components/ui/Pagination";
import Input from "@/shared/components/ui/Input";

// Hooks
import { useUsersPage } from "@/apps/admin/features/users/hooks/useUsersPage";

export default function AdminUsersPage() {
	const { t } = useTranslation("common");
	const {
		search,
		setPage,
		handleSearchChange,
		handleDeleted,
		data,
		users,
		isPending,
	} = useUsersPage();

	return (
		<Section
			className="overflow-hidden"
			title={
				<PageTitle
					icon={Users}
					title={t("admin.usersTitle")}
					desc={t("admin.usersDescription")}
				/>
			}
			header={
				<Input
					value={search}
					onChange={(e) => handleSearchChange(e.target.value)}
					placeholder={t("admin.usersSearchPlaceholder")}
					className="w-72 max-md:w-full"
					aria-label={t("admin.usersSearchPlaceholder")}
				/>
			}>
			<AdminTable
				isPending={isPending}
				headers={
					<>
						<th className="p-3 text-end font-semibold">
							{t("admin.columnUsername")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnEmail")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnPhone")}
						</th>
						<th className="p-3 text-end font-semibold">
							{t("admin.columnRole")}
						</th>
						<th className="p-3 text-end font-semibold max-md:hidden">
							{t("admin.columnCreatedAt")}
						</th>
						<th className="p-3 text-end font-semibold" />
					</>
				}
				empty={
					!isPending && users.length === 0 ? (
						<tr>
							<td colSpan={6} className="p-6 text-center text-text-muted">
								{t("admin.usersEmpty")}
							</td>
						</tr>
					) : null
				}>
				{users.map((u) => (
					<tr
						key={u.user_id}
						className="border-t border-border transition-colors duration-150 hover:bg-surface/50">
						<td className="p-3 font-medium text-primary-text">{u.username}</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{u.email ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{u.phone_number ?? t("jobs.emptyValue")}
						</td>
						<td className="p-3">
							<span
								className={
									u.role === "admin"
										? "rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent"
										: "rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-text-muted"
								}>
								{u.role === "admin"
									? t("admin.roleAdmin")
									: t("admin.roleUser")}
							</span>
						</td>
						<td className="p-3 text-text-muted max-md:hidden">
							{new Date(u.created_at).toLocaleDateString()}
						</td>
						<td className="p-3">
							<DeleteUserDialog
								id={u.user_id}
								username={u.username}
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
