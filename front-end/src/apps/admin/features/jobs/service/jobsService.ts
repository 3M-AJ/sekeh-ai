import { api, type ApiResponse } from "@/shared/api/client";
import type {
	AdminJob,
	AdminJobDetail,
	AdminJobsReturn,
	JobsQuery,
	UpdateJobPayload,
} from "@/apps/admin/features/jobs/types";

export const jobsAPI = {
	jobs: (params: JobsQuery) =>
		api.get<ApiResponse<AdminJobsReturn>>("/admin/jobs", { params }),

	job: (job_id: number) =>
		api.get<ApiResponse<AdminJobDetail>>(`/admin/jobs/${job_id}`),

	updateJob: ({
		job_id,
		payload,
	}: {
		job_id: number;
		payload: UpdateJobPayload;
	}) => api.patch<ApiResponse<AdminJob>>(`/admin/jobs/${job_id}`, payload),

	deleteJob: (job_id: number) =>
		api.delete<ApiResponse<null>>(`/admin/jobs/${job_id}`),
};
