export interface AdminUser {
	user_id: number;
	username: string;
	email: string | null;
	phone_number: string | null;
	role: string;
	created_at: string;
	updated_at: string;
}

export interface AdminUsersReturn {
	users: AdminUser[];
	total: number;
	page: number;
	pages: number;
}

export interface UsersQuery {
	q?: string;
	page?: number;
	per_page?: number;
}
