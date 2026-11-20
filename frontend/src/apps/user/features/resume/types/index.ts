export interface ResumeFormObject {
	title: string;
	content: string;
}

export interface ResumeItem {
	id: number | string;
	title: string;
	content: string;
	created_at?: string;
	updated_at?: string;
}
