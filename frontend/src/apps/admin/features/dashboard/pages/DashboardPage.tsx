import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { AdminStats } from "@/apps/admin/features/dashboard/types";

// Components
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import LoadingBlock from "@/shared/components/feedback/LoadingBlock";

// Hooks
import { useDashboardPage } from "@/apps/admin/features/dashboard/hooks/useDashboardPage";

export default function AdminDashboardPage() {
	const { t } = useTranslation("common");
	const { stats, isPending } = useDashboardPage();

	const STAT_LABELS: Record<keyof AdminStats, string> = {
		total_users: t("admin.statUsers"),
		total_jobs: t("admin.statJobs"),
		total_chats: t("admin.statChats"),
		total_messages: t("admin.statMessages"),
	};

	return (
		<Section
			title={
				<PageTitle
					icon={Settings}
					title={t("admin.dashboardTitle")}
					desc={t("admin.dashboardDescription")}
				/>
			}>
			<div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
				{isPending ? (
					<LoadingBlock
						variant="pulse"
						count={4}
						className="contents"
						pulseClassName="h-28"
					/>
				) : (
					(Object.keys(STAT_LABELS) as (keyof AdminStats)[]).map((key) => (
							<div
								key={key}
								className="flex flex-col gap-2 rounded-lg border border-border bg-background p-5 transition-colors duration-150 hover:border-accent-hover">
								<p className="text-sm font-medium text-text-muted">
									{STAT_LABELS[key]}
								</p>
								<p className="text-3xl font-bold text-primary-text">
									{stats ? stats[key] : 0}
								</p>
							</div>
						))
				)}
			</div>
		</Section>
	);
}
