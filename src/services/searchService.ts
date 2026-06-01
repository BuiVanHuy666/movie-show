import api from "@/app/configs/api.ts";
import type { TrendingKeywordsResponse } from "@/types/trendingKeywords.ts";
import type { TvShowsResponse } from "@/types/tvShow.ts";
import type { MoviesResponse } from "@/types/movie.ts";

export interface FilterOptions {
	genres: number[];
	allReleases: boolean;
	fromDate: string;
	toDate: string;
	language: string;
	userScore: number[];
	minUserVotes: number[];
	runtime: number[];
}

const buildDiscoverQueryString = (filters: FilterOptions, isTv: boolean = false) => {
	const params = new URLSearchParams();

	params.append("include_adult", "false");
	params.append("vote_average.gte", filters.userScore[0].toString());
	params.append("vote_average.lte", filters.userScore[1].toString());
	params.append("vote_count.gte", filters.minUserVotes[0].toString());
	params.append("with_runtime.gte", filters.runtime[0].toString());
	params.append("with_runtime.lte", filters.runtime[1].toString());

	if (filters.genres.length > 0) {
		params.append("with_genres", filters.genres.join(","));
	}

	if (filters.language) {
		params.append("with_original_language", filters.language);
	}

	if (!filters.allReleases) {
		if (isTv) {
			if (filters.fromDate) params.append("first_air_date.gte", filters.fromDate);
			if (filters.toDate) params.append("first_air_date.lte", filters.toDate);
		} else {
			if (filters.fromDate) params.append("primary_release_date.gte", filters.fromDate);
			if (filters.toDate) params.append("primary_release_date.lte", filters.toDate);
		}
	}

	return params.toString();
};

export const SearchService = {
	getTrendingKeywords: (timeWindow: "day" | "week" = "day"): Promise<TrendingKeywordsResponse> =>
			api.get<TrendingKeywordsResponse>(`/trending/all/${timeWindow}`),

	discoverMovies: (filters: FilterOptions): Promise<MoviesResponse> => {
		const queryString = buildDiscoverQueryString(filters, false);
		return api.get(`/discover/movie?${queryString}`);
	},

	discoverTVShows: (filters: FilterOptions): Promise<TvShowsResponse> => {
		const queryString = buildDiscoverQueryString(filters, true);
		return api.get(`/discover/tv?${queryString}`);
	}
};