import type { Job } from "@/shared/types";
import { api, type ApiResponse } from "@/shared/api/client";
import type { MarkedObject } from "@/apps/user/features/marks/types";

const nameSpace = "/bookmarks";

const MarkAPI = {
	markCard: (payload: Job) =>
		api.post<ApiResponse<{ bookmarked: boolean; job_url: string }>>(
			`${nameSpace}/toggle`,
			payload,
		),
	allMarked: () => api.get<ApiResponse<MarkedObject>>(`${nameSpace}`),
};

export type { MarkedObject } from "@/apps/user/features/marks/types";
export { MarkAPI };
