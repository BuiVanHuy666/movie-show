import { useEffect, useState } from "react";
import type { Cast, MovieDetails, Review, SimilarMovie } from "@/types/movie.ts";
import { MovieService } from "@/services/mediaService.ts";

interface MovieDetailState {
	movie: MovieDetails | null;
	casts: Cast[];
	similar: SimilarMovie[];
	reviews: Review[];
	isLoading: boolean;
	error: string | null;
}

const INITIAL_STATE: MovieDetailState = {
	movie: null,
	casts: [],
	similar: [],
	reviews: [],
	isLoading: false,
	error: null,
};

interface CastsResponse { cast: Cast[] }
interface PaginatedResponse<T> { results: T[] }

export const useMovieDetail = (movieId: string | undefined, lang: string): MovieDetailState => {
	const [state, setState] = useState<MovieDetailState>(INITIAL_STATE);

	useEffect(() => {
		if (!movieId) return;

		let cancelled = false;

		const fetchData = async () => {
			setState(prev => ({ ...prev, isLoading: true, error: null }));

			const id = parseInt(movieId, 10);

			const [detailsRes, castsRes, similarRes, reviewsRes] = await Promise.allSettled([
				MovieService.getDetails(id, '&append_to_response=videos,keywords'),
				MovieService.getCasts(id),
				MovieService.getSimilar(id),
				MovieService.getReviews(id),
			]);

			if (cancelled) return;

			const movie = detailsRes.status === "fulfilled"
					? (detailsRes.value as MovieDetails)
					: null;

			const casts = castsRes.status === "fulfilled"
					? (castsRes.value as CastsResponse).cast.slice(0, 15)
					: [];

			const similar = similarRes.status === "fulfilled"
					? (similarRes.value as PaginatedResponse<SimilarMovie>).results.slice(0, 10)
					: [];

			const reviews = reviewsRes.status === "fulfilled"
					? (reviewsRes.value as PaginatedResponse<Review>).results.slice(0, 5)
					: [];

			const error = detailsRes.status === "rejected"
					? "Không thể tải thông tin phim. Vui lòng thử lại."
					: null;

			setState({ movie, casts, similar, reviews, isLoading: false, error });
		};

		fetchData();

		return () => { cancelled = true; };
	}, [movieId, lang]);

	return state;
};