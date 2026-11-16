export interface CompanyReviews {
	rating: number;
	count: number;
}

export interface Job {
	job_title: string;
	company_name: string;
	match_percent: number;
	requirements: string[];
	job_url: string;
	source_site: string;
	company_reviews?: CompanyReviews | null;
	paycheck?: string | null;
}
