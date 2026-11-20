import { api, type ApiResponse } from "@/shared/api/client";
import type { AdminStats } from "@/apps/admin/features/dashboard/types";

export const dashboardAPI = {
	stats: () => api.get<ApiResponse<AdminStats>>("/admin/stats"),
};
