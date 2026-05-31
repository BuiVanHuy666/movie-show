import { useEffect, useState } from "react";
import type { Cast, Crew, MovieDetails, SimilarMovie, Movie } from "@/types/movie.ts";
import { MovieService } from "@/services/mediaService.ts";
import type { Review } from "@/types/common.ts";

interface MovieDetailState {
	movie: MovieDetails | null;
	casts: Cast[];
	crew: Crew[];
	similar: SimilarMovie[];
	recommendations: Movie[];
	reviews: Review[];
	isLoading: boolean;
	hasError: boolean;
}

const INITIAL_STATE: MovieDetailState = {
	movie: null,
	casts: [],
	crew: [],
	similar: [],
	recommendations: [],
	reviews: [],
	isLoading: false,
	hasError: false,
};

export const useMovieDetail = (movieId: string | undefined, lang: string): MovieDetailState => {
	const [state, setState] = useState<MovieDetailState>(INITIAL_STATE);

	useEffect(() => {
		if (!movieId) return;

		let cancelled = false;

		const fetchData = async () => {
			setState(prev => ({ ...prev, isLoading: true, hasError: false }));
			const id = parseInt(movieId, 10);

			try {
				const data = await MovieService.getDetails(id, '&append_to_response=videos,keywords,credits,reviews,similar,external_ids,recommendations');

				if (cancelled) return;

				const casts = data.credits?.cast?.slice(0, 15) || [];
				const crew = data.credits?.crew?.filter((c: { popularity: number; }) => c.popularity > 0.05).slice(0, 15) || [];
				const similar = data.similar?.results?.slice(0, 10) || [];
				const recommendations = data.recommendations?.results?.slice(0, 10) || [];
				const reviews = data.reviews?.results?.slice(0, 5) || [];

				setState({ movie: data, casts, crew, similar, recommendations, reviews, isLoading: false, hasError: false });
			} catch (error) {
				console.error("Failed to fetch movie details:", error);
				if (!cancelled) {
					setState(prev => ({ ...prev, isLoading: false, hasError: true }));
				}
			}
		};

		fetchData();

		return () => { cancelled = true; };
	}, [movieId, lang]);

	return state;
};