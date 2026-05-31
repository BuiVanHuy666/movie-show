import api from "@/app/configs/api.ts";
import type { MovieDetails, MoviesResponse } from "@/types/movie.ts";
import type { TVDetails, TvShowsResponse } from "@/types/tvShow.ts";
import type {PersonDetails, PersonsResponse } from "@/types/person.ts";

type MediaType = 'movie' | 'tv' | 'person';

const getMediaList = <T>(type: MediaType, category: string, page: number = 1): Promise<T> => {
	return api.get(`/${type}/${category}`, `&page=${page}`);
};

const getTrending = <T>(type: MediaType | 'all', timeWindow: "day" | "week" = "day"): Promise<T> => {
	return api.get(`/trending/${type}/${timeWindow}`);
};

const getMediaDetails = <T>(type: MediaType | 'person', id: number, params: string = ""): Promise<T> => {
	return api.get(`/${type}/${id}`, params);
};

export const MovieService = {
	getMovieByType: (type: string, page?: number) => getMediaList<MoviesResponse>('movie', type, page),
	getPopular: (page?: number) => getMediaList<MoviesResponse>('movie', 'popular', page),
	getNowPlaying: (page?: number) => getMediaList<MoviesResponse>('movie', 'now_playing', page),
	getUpcoming: (page?: number) => getMediaList<MoviesResponse>('movie', 'upcoming', page),
	getTopRated: (page?: number) => getMediaList<MoviesResponse>('movie', 'top_rated', page),
	getDetails: (id: number, params?: string) => getMediaDetails<MovieDetails>('movie', id, params),
	getTrending: (timeWindow?: "day" | "week") => getTrending<MoviesResponse>('movie', timeWindow),


	getSimilar: (movieId: number, page?: number) => getMediaList<MoviesResponse>('movie', `${movieId}/similar`, page),
	getReviews: (movieId: number) => api.get(`/movie/${movieId}/reviews`, "", "en-US"),
	getCasts: (movieId: number) => api.get(`/movie/${movieId}/credits`),
};

export const TVService = {
	getTVShowsByType: (type: string, page?: number) => getMediaList<TvShowsResponse>('tv', type, page),
	getPopular: (page?: number) => getMediaList<TvShowsResponse>('tv', 'popular', page),
	getOnTheAir: (page?: number) => getMediaList<TvShowsResponse>('tv', 'on_the_air', page),
	getDetails: (id: number, params?: string) => getMediaDetails<TVDetails>('tv', id, params),
	getTrending: (timeWindow?: "day" | "week") => getTrending('tv', timeWindow),

	getSeasonDetails: (tvId: number, seasonNumber: number) => api.get(`/tv/${tvId}/season/${seasonNumber}`),
	getEpisodeDetails: (tvId: number, seasonNumber: number, episodeNumber: number) => api.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`),
};

export const PersonService = {
	getPopular: (page?: number) => getMediaList<PersonsResponse>('person', 'popular', page),
	getDetails: (id: number, params?: string) => getMediaDetails<PersonDetails>('person', id, params),
};