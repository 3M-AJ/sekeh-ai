import { api, type ApiResponse } from "@/shared/api/client";
import type {
	ResumeFormObject,
	ResumeItem,
} from "@/apps/user/features/resume/types";

const resumeAPI = {
	createResume: (form: ResumeFormObject) =>
		api.post<ApiResponse<null>>("/resumes", form),
	updateResume: (id: number | string, form: ResumeFormObject) =>
		api.put<ApiResponse<null>>(`/resumes/${id}`, form),
	getResumes: () => api.get<ApiResponse<ResumeItem[]>>("/resumes"),
	getResumeById: (id: number | string) =>
		api.get<ApiResponse<ResumeItem>>(`/resumes/${id}`),
	deleteResume: (id: number | string) =>
		api.delete<ApiResponse<null>>(`/resumes/${id}`),
};

export type { ResumeFormObject, ResumeItem } from "@/apps/user/features/resume/types";
export { resumeAPI };
