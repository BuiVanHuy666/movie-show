import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, ImageIcon, Play, ExternalLink, User, Link as LinkIcon } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook, FaImdb } from "react-icons/fa";
import { useMovieDetail } from "@/hooks/useMovieDetail.ts";
import { formatCurrency, formatRuntime, getLanguageName } from "@/utils/movieUtils.ts";
import { ScoreCircle } from "@/features/movies/components/ScoreCircle.tsx";
import { ReviewsList } from "@/features/movies/components/ReviewList.tsx";
import { CastList } from "@/features/movies/components/CastList.tsx";
import { SimilarMoviesList } from "@/features/movies/components/SimilarMovieList.tsx";
import { PATHS } from "@/app/routes/routes.ts";

export const MovieDetailPage = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

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

	const trailerKey = useMemo(
			() => movie?.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer")?.key ?? null,
			[movie]
	);

	const releaseYear = movie?.release_date?.substring(0, 4) ?? "";
	const userScore = movie ? Math.round(movie.vote_average * 10) : 0;
	const noInfoText = t("movieDetails.noInfo");

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
				<div className="relative w-full min-h-125 bg-zinc-950 flex items-center text-white">
					<div className="absolute inset-0 z-0">
						{movie.backdrop_path ? (
								<img
										src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
										alt={movie.title}
										className="w-full h-full object-cover"
								/>
						) : (
								<div className="w-full h-full bg-zinc-900 flex items-center justify-center">
									<ImageIcon className="w-20 h-20 text-zinc-800" />
								</div>
						)}
						<div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px]" />
					</div>

					<div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 px-6 md:px-12 py-12 w-full container mx-auto">
						<div className="w-48 md:w-64 shrink-0">
							<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									className="w-full rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-zinc-700/50"
							/>
						</div>

						<div className="flex-1 min-w-0 flex flex-col justify-center">
							<h1 className="text-3xl md:text-5xl font-extrabold tracking-tight wrap-break-word">
								{movie.title}
								<span className="font-normal text-zinc-300 whitespace-nowrap ml-2">({releaseYear})</span>
							</h1>

							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm md:text-base text-zinc-200">
								{movie.release_date && (
										<div className="flex items-center gap-1.5 whitespace-nowrap">
											<Calendar className="w-4 h-4 text-zinc-400" />
											<span>{movie.release_date}</span>
										</div>
								)}
								{movie.genres?.length > 0 && (
										<div className="flex items-center gap-2">
											<span className="w-1.5 h-1.5 rounded-full bg-zinc-500 hidden md:block" />
											<span className="wrap-break-word">{movie.genres.map((g) => g.name).join(", ")}</span>
										</div>
								)}
								{movie.runtime && (
										<div className="flex items-center gap-1.5 whitespace-nowrap">
											<span className="w-1.5 h-1.5 rounded-full bg-zinc-500 hidden md:block" />
											<Clock className="w-4 h-4 text-zinc-400" />
											<span>{formatRuntime(movie.runtime, t)}</span>
										</div>
								)}
							</div>

							<div className="flex items-center gap-8 mt-6">
								<ScoreCircle score={userScore} />

								{trailerKey && (
										<a
												href={`https://www.youtube.com/watch?v=${trailerKey}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 group hover:text-emerald-400 transition-colors cursor-pointer"
										>
											<Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform shrink-0" />
											<span className="font-bold text-lg whitespace-nowrap">{t("movieDetails.playTrailer")}</span>
											<ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0" />
										</a>
								)}
							</div>

							{movie.tagline && (
									<div className="text-zinc-400 italic text-lg mt-6 font-medium wrap-break-word">
										"{movie.tagline}"
									</div>
							)}

							<div className="mt-3">
								<h3 className="font-bold text-xl mb-2">{t("movieDetails.overview")}</h3>
								<p className="text-base text-zinc-200 leading-relaxed max-w-4xl wrap-break-word whitespace-normal">
									{movie.overview || noInfoText}
								</p>
							</div>

							{movie.belongs_to_collection && (
									<div className="mt-6 inline-block bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
										<h4 className="font-bold text-lg text-white">
											{t("movieDetails.collection", { name: movie.belongs_to_collection.name })}
										</h4>
									</div>
							)}
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row px-6 md:px-12 py-8 bg-background gap-8 container mx-auto text-foreground">
					<div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
						<div className="flex items-center gap-4 text-foreground px-1">
							{movie.external_ids?.facebook_id && (
									<a href={`https://facebook.com/${movie.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer">
										<FaFacebook className="w-6 h-6 hover:text-sky-500 cursor-pointer transition-colors" />
									</a>
							)}
							{movie.external_ids?.twitter_id && (
									<a href={`https://twitter.com/${movie.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer">
										<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer transition-colors" />
									</a>
							)}
							{movie.external_ids?.instagram_id && (
									<a href={`https://instagram.com/${movie.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer">
										<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
									</a>
							)}
							{movie.external_ids?.imdb_id && (
									<a href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer">
										<FaImdb className="w-6 h-6 hover:text-amber-400 cursor-pointer transition-colors" />
									</a>
							)}
							{movie.homepage && (
									<a href={movie.homepage} target="_blank" rel="noopener noreferrer">
										<LinkIcon className="w-6 h-6 hover:text-emerald-500 cursor-pointer transition-colors" />
									</a>
							)}
						</div>

						<div className="space-y-5">
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.originalTitle")}</p>
								<p className="text-sm font-medium text-foreground">{movie.original_title || noInfoText}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.status")}</p>
								<p className="text-sm font-medium text-foreground">{movie.status || noInfoText}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.originalLanguage")}</p>
								<p className="text-sm font-medium text-foreground capitalize">
									{movie.original_language ? getLanguageName(movie.original_language, i18n.language) : noInfoText}
								</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.budget")}</p>
								<p className="text-sm font-medium text-foreground">{formatCurrency(movie.budget, noInfoText)}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.revenue")}</p>
								<p className="text-sm font-medium text-foreground">{formatCurrency(movie.revenue, noInfoText)}</p>
							</div>

							{movie.production_countries?.length > 0 && (
									<div>
										<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.productionCountries")}</p>
										<p className="text-sm font-medium text-foreground">
											{movie.production_countries.map(c => c.name).join(", ")}
										</p>
									</div>
							)}

							{movie.spoken_languages?.length > 0 && (
									<div>
										<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.spokenLanguages")}</p>
										<p className="text-sm font-medium text-foreground">
											{movie.spoken_languages.map(l => l.english_name).join(", ")}
										</p>
									</div>
							)}

							{movie.production_companies?.length > 0 && (
									<div>
										<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.productionCompanies")}</p>
										<p className="text-sm font-medium text-foreground">
											{movie.production_companies.map(c => c.name).join(", ")}
										</p>
									</div>
							)}

							<div className="pt-2">
								<p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wider">{t("movieDetails.keywords")}</p>
								<div className="flex flex-wrap gap-2">
									{movie.keywords?.keywords?.length ? (
											movie.keywords.keywords.map((kw) => (
													<span key={kw.id} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-secondary/80 transition-colors">
											{kw.name}
										</span>
											))
									) : (
											<span className="text-xs text-muted-foreground italic">{t("movieDetails.noKeywords")}</span>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 min-w-0 overflow-hidden flex flex-col gap-8">
						<CastList casts={casts} />

						{crew.length > 0 && (
								<div className="space-y-4 pt-2 border-t border-border">
									<h3 className="font-bold text-xl">{t("movieDetails.crew")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{crew.map((cr, idx) => (
												<div
														key={`${cr.id}-${idx}`}
														className="w-32 shrink-0 cursor-pointer group"
														onClick={() => navigate(PATHS.ACTORS.DETAIL(cr.id))}
												>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-2/3 bg-muted border border-border/50">
														{cr.profile_path ? (
																<img src={`https://image.tmdb.org/t/p/w200${cr.profile_path}`} alt={cr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
														) : (
																<div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-muted-foreground/50" /></div>
														)}
													</div>
													<p className="text-sm font-bold truncate group-hover:text-emerald-500">{cr.name}</p>
													<p className="text-xs text-foreground mt-0.5 truncate font-medium">{cr.job}</p>
												</div>
										))}
									</div>
								</div>
						)}

						<ReviewsList reviews={reviews} />
						<SimilarMoviesList movies={similar} currentMovieTitle={movie.title} />

						{recommendations.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("movieDetails.recommendations")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{recommendations.map(rec => (
												<div key={rec.id} className="w-56 shrink-0 cursor-pointer group" onClick={() => navigate(PATHS.MOVIES.DETAIL(rec.id))}>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-video bg-muted relative">
														{rec.backdrop_path ? (
																<img src={`https://image.tmdb.org/t/p/w300${rec.backdrop_path}`} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
														) : (
																<div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-muted-foreground/50" /></div>
														)}
													</div>
													<p className="text-sm font-bold truncate group-hover:text-emerald-500">{rec.title}</p>
												</div>
										))}
									</div>
								</div>
						)}
					</div>
				</div>
			</>
	);
};