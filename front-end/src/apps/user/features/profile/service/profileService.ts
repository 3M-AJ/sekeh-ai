import { api, type ApiResponse } from "@/shared/api/client";
import type {
	PasswordPayload,
	UserForm,
	UserInfo,
} from "@/apps/user/features/profile/types";

const meNameSpace = "user/me";

export const profileAPI = {
	updateProfile: (payload: UserForm) =>
		api.patch<ApiResponse<string>>(meNameSpace, payload),

	getProfile: () => api.get<ApiResponse<{ user: UserInfo }>>(meNameSpace),

	deleteProfile: () => api.delete<ApiResponse<string>>(meNameSpace),

	changePassword: (payload: PasswordPayload) =>
		api.patch<ApiResponse<string>>(`${meNameSpace}/password`, payload),
};
