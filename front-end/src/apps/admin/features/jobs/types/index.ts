export interface AdminJob {
	job_id: number;
	job_url: string;
	source_site: string | null;
	job_title: string | null;
	company_name: string | null;
	location: string | null;
	paycheck: string | null;
	requirements: string[] | Record<string, unknown> | null;
	has_embedding: boolean;
}

export interface AdminJobsReturn {
	jobs: AdminJob[];
	total: number;
	page: number;
	pages: number;
}

export interface AdminJobDetail extends AdminJob {
	raw_text: string;
}

export interface UpdateJobPayload {
	job_title?: string;
	company_name?: string;
	location?: string;
	paycheck?: string;
	requirements?: string[];
	raw_text?: string;
	source_site?: string;
}

export interface JobsQuery {
	q?: string;
	source_site?: string;
	location?: string;
	page?: number;
	per_page?: number;
}
