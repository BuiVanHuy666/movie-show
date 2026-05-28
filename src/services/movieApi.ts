import type { TMDBResponse } from "@/types/movie";
import i18n from "@/lib/i18n.ts";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const getTMDBLanguage = (): string => {
	return i18n.language === "vi" ? "vi-VN" : "en-US";
};

const fetchTMDB = async <T>(endpoint: string, extraParams: string = "", customLang?: string): Promise<T> => {
	try {
		const lang = customLang !== undefined ? customLang : getTMDBLanguage();

		const langQuery = lang ? `&language=${lang}` : "";

		const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${langQuery}${extraParams}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Lỗi gọi API từ TMDB: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Lỗi ở endpoint ${endpoint}:`, error);
		throw error;
	}
};

export const getPopularMovies = (page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/movie/popular", `&page=${page}`);

export const getTrendingMovies = (timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> =>
		fetchTMDB(`/trending/movie/${timeWindow}`);

export const getNowPlayingMovies = (page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/movie/now_playing", `&page=${page}`);

export const getUpcomingMovies = (page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/movie/upcoming", `&page=${page}`);

export const getTopRatedMovies = (page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/movie/top_rated", `&page=${page}`);

export const searchMovies = (keyword: string, page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/search/movie", `&query=${encodeURIComponent(keyword)}&include_adult=false&page=${page}`);

export const getMovieGenres = () => fetchTMDB("/genre/movie/list");
export const getTvGenres = () => fetchTMDB("/genre/tv/list");

export const getMoviesByGenre = (genreId: number, page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB("/discover/movie", `&with_genres=${genreId}&page=${page}`);

export const getMovieDetails = (movieId: number) =>
		fetchTMDB(`/movie/${movieId}`, "&append_to_response=videos,keywords");

export const getMovieReviews = (movieId: number) =>
		fetchTMDB(`/movie/${movieId}/reviews`, "", "en-US");

export const getSimilarMovies = (movieId: number, page: number = 1): Promise<TMDBResponse> =>
		fetchTMDB(`/movie/${movieId}/similar`, `&page=${page}`);

export const getMovieCasts = (movieId: number) =>
		fetchTMDB(`/movie/${movieId}/credits`);

export const getTrendingAll = (timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> =>
		fetchTMDB(`/trending/all/${timeWindow}`);