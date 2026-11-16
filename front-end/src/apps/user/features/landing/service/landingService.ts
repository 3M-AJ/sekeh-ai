import { api, type ApiResponse } from "@/shared/api/client";
import type { LandingContent } from "@/apps/user/features/landing/types";

const landingAPI = {
	getLanding: () => api.get<ApiResponse<LandingContent>>("/landing"),
};

export type { LandingContent } from "@/apps/user/features/landing/types";
export { landingAPI };
