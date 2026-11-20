import type { UserForm, UserInfo } from "@/apps/user/features/auth/types";

export type { UserForm, UserInfo };

export interface PasswordPayload {
	current_password: string;
	new_password: string;
}
