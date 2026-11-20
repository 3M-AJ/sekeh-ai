export interface LandingContent {
	hero: HeroSection;
	problem_section: ProblemSection;
	solution_section: SolutionSection;
	features_section: FeaturesSection;
	how_it_works: HowItWorksSection;
	stats: StatsSection;
	final_cta: FinalCTASection;
}

export interface HeroSection {
	title: string;
	subtitle: string;
	secondary_cta: string;
	secondary_cta_link: string;
}

export interface ProblemSection {
	title: string;
	description: string;
	points: ProblemPoint[];
}

export interface ProblemPoint {
	title: string;
	detail: string;
}

export interface SolutionSection {
	title: string;
	description: string;
	steps: string[];
}

export interface FeaturesSection {
	title: string;
	features: Feature[];
}

export interface Feature {
	key: string;
	title: string;
	description: string;
}

export interface HowItWorksSection {
	title: string;
	steps: HowItWorksStep[];
}

export interface HowItWorksStep {
	step: number;
	title: string;
	description: string;
}

export interface StatsSection {
	title: string;
	items: StatItem[];
}

export interface StatItem {
	key: string;
	label: string;
	value: number;
}

export interface FinalCTASection {
	title: string;
	secondary_cta: string;
	secondary_cta_link: string;
}
