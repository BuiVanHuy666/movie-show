import api from "@/app/configs/api.ts";
import type { TrendingKeywordsResponse } from "@/types/trendingKeywords.ts";

export const SearchService = {
	getTrendingKeywords: (timeWindow: "day" | "week" = "day"): Promise<TrendingKeywordsResponse> =>
			api.get<TrendingKeywordsResponse>(`/trending/all/${timeWindow}`),
};