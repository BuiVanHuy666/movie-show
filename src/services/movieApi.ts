import type { TMDBResponse } from "@/types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const fetchTMDB = async <T>(endpoint: string, extraParams: string = ""): Promise<T> => {
    try {
        const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${extraParams}`;

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
        fetchTMDB("/movie/popular", `&language=vi-VN&page=${page}`);

export const getTrendingMovies = (timeWindow: "day" | "week" = "day"): Promise<TMDBResponse> =>
        fetchTMDB(`/trending/movie/${timeWindow}`, "&language=vi-VN");

export const getNowPlayingMovies = (page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB("/movie/now_playing", `&language=vi-VN&page=${page}`);

export const getUpcomingMovies = (page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB("/movie/upcoming", `&language=vi-VN&page=${page}`);

export const getTopRatedMovies = (page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB("/movie/top_rated", `&language=vi-VN&page=${page}`);

export const searchMovies = (keyword: string, page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB("/search/movie", `&query=${encodeURIComponent(keyword)}&include_adult=false&language=vi-VN&page=${page}`);

// --- THỂ LOẠI (GENRES) ---
export const getMovieGenres = () => fetchTMDB("/genre/movie/list", "&language=vi-VN");
export const getTvGenres = () => fetchTMDB("/genre/tv/list", "&language=vi-VN");

export const getMoviesByGenre = (genreId: number, page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB("/discover/movie", `&with_genres=${genreId}&language=vi-VN&page=${page}`);

// --- CHI TIẾT PHIM (DETAILS) ---
export const getMovieDetails = (movieId: number) =>
        fetchTMDB(`/movie/${movieId}`, "&append_to_response=videos&language=vi-VN");

export const getMovieReviews = (movieId: number) =>
        fetchTMDB(`/movie/${movieId}/reviews`, "&language=en-US"); // Review đa phần bằng tiếng Anh

export const getSimilarMovies = (movieId: number, page: number = 1): Promise<TMDBResponse> =>
        fetchTMDB(`/movie/${movieId}/similar`, `&language=vi-VN&page=${page}`);

// Sửa lại endpoint thành /credits cho chuẩn API của TMDB
export const getMovieCasts = (movieId: number) =>
        fetchTMDB(`/movie/${movieId}/credits`, "&language=vi-VN");