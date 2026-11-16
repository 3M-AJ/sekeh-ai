export interface AuthVariables {
	username: string;
	password: string;
}

export interface UserInfo {
	phone_number: string | null;
	username: string;
	email: string | null;
	role: "user" | "admin";
	created_at: string;
	updated_at: string | null;
}

export type UserForm = Pick<UserInfo, "phone_number" | "email" | "username">;

export interface SignupReturn {
	user: UserInfo;
}

export interface LoginReturn {
	user: UserInfo;
	access_token: string;
	refresh_token: string;
	token_type: string;
}
