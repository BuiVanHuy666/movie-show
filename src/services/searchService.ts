import type { TMDBResponse } from "@/types/movie.ts";
import api from "@/app/configs/api.ts";

export type SearchType = "movie" | "tv" | "person";


export const SearchService = {
	getTrendingKeywords: (timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> =>
			api.get(`/trending/all/${timeWindow}`),

	searchByKeyword: (
			query: string,
			page: number = 1,
	): Promise<TMDBResponse> => {
		return api.get(`/search`, `&query=${encodeURIComponent(query)}&page=${page}`);
	},
};