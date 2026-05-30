import api from "@/app/configs/api.ts";
import type { TMDBResponse } from "@/types/movie.ts";

type MediaType = 'movie' | 'tv' | 'person';

const getMediaList = (type: MediaType, category: string, page: number = 1): Promise<TMDBResponse> => {
	return api.get(`/${type}/${category}`, `&page=${page}`);
};

const getTrending = (type: MediaType | 'all', timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> => {
	return api.get(`/trending/${type}/${timeWindow}`);
};

const getMediaDetails = (type: MediaType | 'person', id: number, params: string = "") => {
	return api.get(`/${type}/${id}`, params);
};

export const MovieService = {
	getMovieByType: (type: string, page?: number) => getMediaList('movie', type, page),
	getPopular: (page?: number) => getMediaList('movie', 'popular', page),
	getNowPlaying: (page?: number) => getMediaList('movie', 'now_playing', page),
	getUpcoming: (page?: number) => getMediaList('movie', 'upcoming', page),
	getTopRated: (page?: number) => getMediaList('movie', 'top_rated', page),
	getDetails: (id: number, params?: string) => getMediaDetails('movie', id, params),
	getTrending: (timeWindow?: "day" | "week") => getTrending('movie', timeWindow),


	getSimilar: (movieId: number, page?: number) => getMediaList('movie', `${movieId}/similar`, page),
	getReviews: (movieId: number) => api.get(`/movie/${movieId}/reviews`, "", "en-US"),
	getCasts: (movieId: number) => api.get(`/movie/${movieId}/credits`),
};

export const TVService = {
	getPopular: (page?: number) => getMediaList('tv', 'popular', page),
	getOnTheAir: (page?: number) => getMediaList('tv', 'on_the_air', page),
	getDetails: (id: number, params?: string) => getMediaDetails('tv', id, params),
	getTrending: (timeWindow?: "day" | "week") => getTrending('tv', timeWindow),

	getSeasonDetails: (tvId: number, seasonNumber: number) => api.get(`/tv/${tvId}/season/${seasonNumber}`),
	getEpisodeDetails: (tvId: number, seasonNumber: number, episodeNumber: number) => api.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`),
};

export const PersonService = {
	getDetails: (id: number, params?: string) => getMediaDetails('person', id, params),
};

export const SearchService = {
	getTrendingKeywords: (timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> => api.get(`/trending/all/${timeWindow}`),
};