import { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import {
	Sun, Moon, ChevronLeft, Clock, Calendar,
	UserCircle, ImageIcon, Play, ExternalLink, Star
} from "lucide-react";
import type { Cast, Review, SimilarMovie } from "@/types/movie.ts";
import { useMovieDetail } from "@/hooks/useMovieDetail.ts";

const formatRuntime = (minutes: number | null, t: (key: string) => string) => {
	if (!minutes) return t("movieDetails.notApplicable");
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return `${h}h ${m}m`;
};

const formatCurrency = (amount: number, fallbackText: string) => {
	if (!amount || amount === 0) return fallbackText;
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(amount);
};

const getAvatarUrl = (path: string | null): string | null => {
	if (!path) return null;
	if (path.startsWith("/https")) return path.substring(1);
	return `https://image.tmdb.org/t/p/w150_and_h150_face${path}`;
};

const getLanguageName = (langCode: string, locale: string): string => {
	try {
		const displayNames = new Intl.DisplayNames([locale], { type: "language" });
		return displayNames.of(langCode) || langCode;
	} catch {
		return langCode.toUpperCase();
	}
};

const CastList = ({ casts }: { casts: Cast[] }) => {
	const { t } = useTranslation();

	if (!casts || casts.length === 0) return null;

	return (
			<div className="mt-8 pt-8 border-t border-border w-full overflow-hidden">
				<h3 className="text-xl font-bold text-foreground mb-4">
					{t("movieDetails.topBilledCast")}
				</h3>
				<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
					{casts.map((actor) => (
							<div
									key={actor.id}
									className="min-w-[140px] w-[140px] shrink-0 bg-card rounded-lg overflow-hidden border border-border shadow-sm transition-transform hover:bg-accent text-card-foreground cursor-pointer"
							>
								{actor.profile_path ? (
										<img
												src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
												alt={actor.name}
												className="w-full h-[175px] object-cover pointer-events-none"
												draggable={false}
										/>
								) : (
										<div className="w-full h-[175px] bg-muted flex items-center justify-center">
											<UserCircle className="w-12 h-12 text-muted-foreground" />
										</div>
								)}
								<div className="p-3 pointer-events-none">
									<p className="font-bold text-[15px] leading-tight mb-1 truncate">{actor.name}</p>
									<p className="text-xs text-muted-foreground leading-snug truncate">{actor.character}</p>
								</div>
							</div>
					))}
				</div>
			</div>
	);
};

const SimilarMoviesList = ({movies, currentMovieTitle, onMovieClick,}: {
	movies: SimilarMovie[];
	currentMovieTitle: string;
	onMovieClick: (id: number) => void;
}) => {
	const { t } = useTranslation();

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
									onClick={() => onMovieClick(movie.id)}
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

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
	const { t, i18n } = useTranslation();

	if (!reviews || reviews.length === 0) return null;

	return (
			<div className="mt-8 pt-8 border-t border-border w-full overflow-hidden">
				<h3 className="text-xl font-bold text-foreground mb-6">
					{t("movieDetails.reviews")}
					<span className="text-muted-foreground text-base font-normal"> ({reviews.length})</span>
				</h3>
				<div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
					{reviews.map((review) => {
						const avatar = getAvatarUrl(review.author_details.avatar_path);
						return (
								<div
										key={review.id}
										className="min-w-[350px] w-[350px] shrink-0 group cursor-pointer bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex items-center gap-4 mb-4">
										{avatar ? (
												<img
														src={avatar}
														alt={review.author}
														className="w-12 h-12 rounded-full object-cover bg-muted"
												/>
										) : (
												<div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-500 flex items-center justify-center font-bold text-lg">
													{review.author.charAt(0).toUpperCase()}
												</div>
										)}
										<div>
											<p className="font-bold text-foreground truncate w-48">
												{t("movieDetails.reviewBy")} {review.author}
											</p>
											<div className="flex items-center gap-2 mt-1">
												{review.author_details.rating && (
														<span className="flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-md text-xs font-semibold text-secondary-foreground">
												<Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
															{Number(review.author_details.rating).toFixed(1)}
											</span>
												)}
												<span className="text-xs text-muted-foreground">
											{new Date(review.created_at).toLocaleDateString(
													i18n.language === "vi" ? "vi-VN" : "en-US",
													{ month: "short", day: "numeric", year: "numeric" }
											)}
										</span>
											</div>
										</div>
									</div>
									<p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-border pl-4 h-32 overflow-y-auto custom-scrollbar">
										{review.content}
									</p>
								</div>
						);
					})}
				</div>
			</div>
	);
};

// --- SCORE CIRCLE ---
const ScoreCircle = ({ score }: { score: number }) => {
	const { t } = useTranslation();
	const radius = 26;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (score / 100) * circumference;

	const scoreColor =
			score >= 70 ? "text-emerald-500"
					: score >= 40 ? "text-yellow-500"
							: "text-red-500";
	const trackColor =
			score >= 70 ? "text-emerald-950"
					: score >= 40 ? "text-yellow-950"
							: "text-red-950";

	return (
			<div className="flex items-center gap-3">
				<div className="relative w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg shrink-0">
					<svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
						<circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className={trackColor} />
						<circle
								cx="32" cy="32" r={radius}
								stroke="currentColor" strokeWidth="4" fill="transparent"
								strokeDasharray={circumference}
								strokeDashoffset={strokeDashoffset}
								strokeLinecap="round"
								className={`${scoreColor} transition-all duration-1000 ease-out`}
						/>
					</svg>
					<span className="text-xl font-bold relative z-10 text-white">
					{score > 0 ? <>{score}<span className="text-xs font-normal">%</span></> : "NR"}
				</span>
				</div>
				<span className="font-bold text-sm leading-tight max-w-[50px]">{t("movieDetails.userScore")}</span>
			</div>
	);
};

// --- MAIN COMPONENT ---
export const MovieDetail = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const { theme, setTheme } = useTheme();

	const { movie, casts, similar, reviews, isLoading, error } = useMovieDetail(movieId, i18n.language);

	const toggleLanguage = useCallback(() => {
		i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
	}, [i18n]);

	const handleSimilarMovieClick = useCallback((id: number) => {
		navigate(`/movie/${id}`);
		window.scrollTo(0, 0);
	}, [navigate]);

	const trailerKey = useMemo(
			() => movie?.videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer")?.key ?? null,
			[movie]
	);

	const releaseYear = movie?.release_date?.substring(0, 4) ?? "";
	const userScore = movie ? Math.round(movie.vote_average * 10) : 0;
	const noInfoText = t("movieDetails.noInfo");

	return (
			<div className="min-h-screen bg-background text-foreground">
				{/* NAVBAR */}
				<div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
					<div className="container px-4 mx-auto py-3 flex items-center justify-between">
						<button
								onClick={() => navigate(-1)}
								className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<ChevronLeft className="w-5 h-5" />
							<span className="font-medium">{t("movieDetails.back")}</span>
						</button>

						<div className="flex items-center gap-4 shrink-0">
							<button
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									className="flex items-center justify-center w-10 h-10 transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
							>
								{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
							</button>
							<button
									onClick={toggleLanguage}
									className="flex items-center justify-center w-10 h-10 text-sm font-bold transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
							>
								{i18n.language === "vi" ? "VI" : "EN"}
							</button>
						</div>
					</div>
				</div>

				{/* STATES */}
				{isLoading ? (
						<div className="h-[600px] flex items-center justify-center">
							<p className="animate-pulse text-muted-foreground">{t("movieDetails.loadingData")}</p>
						</div>
				) : error ? (
						<div className="h-[400px] flex items-center justify-center">
							<p className="text-destructive text-center px-4">{error}</p>
						</div>
				) : movie ? (
						<>
							{/* HERO */}
							<div className="relative w-full min-h-[500px] bg-zinc-950 flex items-center text-white">
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
										<h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-words">
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
														<span className="break-words">{movie.genres.map((g) => g.name).join(", ")}</span>
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
												<div className="text-zinc-400 italic text-lg mt-6 font-medium break-words">
													"{movie.tagline}"
												</div>
										)}

										<div className="mt-3">
											<h3 className="font-bold text-xl mb-2">{t("movieDetails.overview")}</h3>
											<p className="text-base text-zinc-200 leading-relaxed max-w-4xl break-words whitespace-normal">
												{movie.overview || t("movieDetails.noInfo")}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* SECONDARY CONTENT & SIDEBAR */}
							<div className="flex flex-col md:flex-row px-6 md:px-12 py-8 bg-background gap-8 container mx-auto text-foreground">
								{/* SIDEBAR */}
								<div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
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

								{/* MAIN CONTENT */}
								<div className="flex-1 min-w-0 overflow-hidden">
									<CastList casts={casts} />
									<ReviewsList reviews={reviews} />
									<SimilarMoviesList movies={similar} currentMovieTitle={movie.title} onMovieClick={handleSimilarMovieClick} />
								</div>
							</div>
						</>
				) : (
						<div className="h-[400px] flex items-center justify-center">
							<p className="text-muted-foreground">{t("movieDetails.notFound")}</p>
						</div>
				)}
			</div>
	);
};