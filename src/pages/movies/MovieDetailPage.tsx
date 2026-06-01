import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMovieDetail } from "@/hooks/useMovieDetail.ts";
import { ReviewsList } from "@/components/movie/details/ReviewList.tsx";
import { SimilarMoviesList } from "@/components/movie/details/SimilarMovieList.tsx";
import { Hero } from "@/components/movie/details/Hero.tsx";
import { Sidebar } from "@/components/movie/details/SideBar.tsx";
import { MediaPersonList } from "@/components/common/media/MediaPersonList.tsx";
import { MediaList } from "@/components/common/media/MediaList.tsx";

export const MovieDetailPage = () =>
	{
		const {movieId} = useParams<{ movieId: string }>();
		const {t, i18n} = useTranslation();

		const {
			movie,
			casts,
			crew,
			similar,
			recommendations,
			reviews,
			isLoading,
			hasError
		} = useMovieDetail(movieId, i18n.language);

		const trailerKey = useMemo(() => movie?.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer")?.key ?? null, [movie]);

		if (isLoading) {
			return (
					<div className="h-150 flex items-center justify-center">
						<p className="animate-pulse text-muted-foreground">{t("movieDetails.loadingData")}</p>
					</div>
			);
		}

		if (hasError) {
			return (
					<div className="h-100 flex items-center justify-center">
						<p className="text-destructive text-center px-4">{t("movieDetails.fetchError")}</p>
					</div>
			);
		}

		if (!movie) {
			return (
					<div className="h-100 flex items-center justify-center">
						<p className="text-muted-foreground">{t("movieDetails.notFound")}</p>
					</div>
			);
		}

		return (
				<>
					<Hero movie={movie} trailerKey={trailerKey}/>

					<div className="flex flex-col md:flex-row px-6 md:px-12 py-8 bg-background gap-8 container mx-auto text-foreground">
						<Sidebar movie={movie}/>

						<div className="flex-1 min-w-0 overflow-hidden flex flex-col gap-8">
							<MediaPersonList title={t("movieDetails.topBilledCast")} data={casts} />
							<MediaPersonList title={t("movieDetails.crew")} data={crew} />

							<ReviewsList reviews={reviews}/>
							<SimilarMoviesList movies={similar} currentMovieTitle={movie.title}/>

							<MediaList title={t("movieDetails.recommendations")} data={recommendations} mediaType="movie"/>
						</div>
					</div>
				</>
		);
	};