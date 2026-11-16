import { dashboardAPI } from "@/apps/admin/features/dashboard/service/dashboardService";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

export function useDashboardPage() {
	const { data, isPending } = useCustomQuery({
		key: ["adminStats"],
		func: dashboardAPI.stats,
	});
	return { stats: data?.data, isPending };
}
