import { api, type ApiResponse } from "@/shared/api/client";
import type {
	AuthVariables,
	LoginReturn,
	SignupReturn,
} from "@/apps/user/features/auth/types";

const authNameSpace = "/auth";

export const authAPI = {
	register: (payload: AuthVariables) =>
		api.post<ApiResponse<SignupReturn>>(`${authNameSpace}/register`, payload),

	login: (payload: AuthVariables) =>
		api.post<ApiResponse<LoginReturn>>(`${authNameSpace}/login`, payload),

	logout: () => api.post<ApiResponse<string>>(`${authNameSpace}/logout`),
};

export type {
	AuthVariables,
	UserInfo,
	UserForm,
} from "@/apps/user/features/auth/types";
