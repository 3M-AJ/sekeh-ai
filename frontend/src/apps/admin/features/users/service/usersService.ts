import { api, type ApiResponse } from "@/shared/api/client";
import type {
	AdminUsersReturn,
	UsersQuery,
} from "@/apps/admin/features/users/types";

export const usersAPI = {
	users: (params: UsersQuery) =>
		api.get<ApiResponse<AdminUsersReturn>>("/admin/users", { params }),

	deleteUser: (user_id: number) =>
		api.delete<ApiResponse<null>>(`/admin/users/${user_id}`),
};
