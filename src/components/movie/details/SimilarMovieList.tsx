import { useTranslation } from "react-i18next";
import type { SimilarMovie } from "@/types/movie.ts";
import { useCallback } from "react";
import { PATHS } from "@/app/routes/routes.ts";
import { useNavigate } from "react-router-dom";

export const SimilarMoviesList = ({ movies, currentMovieTitle }: {
	movies: SimilarMovie[];
	currentMovieTitle: string;
}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleSimilarMovieClick = useCallback((id: number) => {
		navigate(PATHS.MOVIES.DETAIL(id));
		window.scrollTo(0, 0);
	}, [navigate]);

	if (!movies || movies.length === 0) return null;

	return (
			<div className="mt-8 pt-8 border-t border-border w-full overflow-hidden">
				<h3 className="text-xl font-bold text-foreground mb-4">
					{t("movieDetails.ifYouLiked")}
					<span className="italic text-muted-foreground">{currentMovieTitle}</span>
					, {t("movieDetails.similarMovies").toLowerCase()}
				</h3>
				<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
					{movies.map((movie) => (
							<div
									key={movie.id}
									onClick={() => handleSimilarMovieClick(movie.id)}
									className="min-w-62.5 w-62.5 shrink-0 group hover:bg-accent p-2 rounded-xl transition-colors cursor-pointer"
							>
								<div className="rounded-lg overflow-hidden mb-3 relative bg-muted aspect-video pointer-events-none">
									{movie.backdrop_path || movie.poster_path ? (
											<img
													src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
													alt={movie.title}
													className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
													draggable={false}
											/>
									) : (
											<div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
												{t("movieDetails.noImage")}
											</div>
									)}
								</div>
								<div className="flex justify-between items-start gap-2 pointer-events-none">
									<p className="font-semibold text-sm text-foreground truncate flex-1" title={movie.title}>
										{movie.title}
									</p>
									<p className="text-sm font-medium text-muted-foreground">
										{Math.round(movie.vote_average * 10)}%
									</p>
								</div>
							</div>
					))}
				</div>
			</div>
	);
};