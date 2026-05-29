import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getDetails } from "@/services/movieApi";
import { PATHS } from "@/app/routes/routes";
import { Tv, Calendar, Star, Link as LinkIcon, User, PlayCircle, Hash } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

interface TVDetails {
	id: number;
	name: string;
	overview: string;
	tagline: string;
	poster_path: string | null;
	backdrop_path: string | null;
	first_air_date: string;
	vote_average: number;
	status: string;
	original_language: string;
	type: string;
	number_of_seasons: number;
	number_of_episodes: number;
	homepage: string | null;
	genres: { id: number; name: string }[];
	networks: { id: number; name: string; logo_path: string | null }[];
	seasons: {
		id: number;
		name: string;
		episode_count: number;
		season_number: number;
		air_date: string | null;
		poster_path: string | null;
	}[];
	aggregate_credits?: {
		cast: any[];
	};
	external_ids?: {
		instagram_id: string | null;
		twitter_id: string | null;
		facebook_id: string | null;
	};
	videos?: {
		results: { key: string; name: string; type: string; site: string }[];
	};
	keywords?: {
		results: { id: number; name: string }[];
	};
	recommendations?: {
		results: any[];
	};
	content_ratings?: {
		results: { iso_3166_1: string; rating: string }[];
	};
}

export const TVShowsDetailPage = () => {
	const { tvId } = useParams<{ tvId: string }>();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const [tvShow, setTvShow] = useState<TVDetails | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!tvId) return;

		const fetchTVData = async () => {
			setIsLoading(true);
			try {
				// Đã nâng cấp thêm recommendations, videos, keywords, content_ratings, aggregate_credits
				const data = await getDetails(
						"tv",
						parseInt(tvId),
						"&append_to_response=aggregate_credits,external_ids,similar,recommendations,videos,keywords,content_ratings"
				);
				setTvShow(data);
			} catch (error) {
				console.error("Lỗi tải chi tiết TV Show:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTVData();
	}, [tvId, i18n.language]);

	if (isLoading) {
		return (
				<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
					<Skeleton className="w-full md:w-[300px] h-[450px] rounded-xl shrink-0" />
					<div className="flex-1 space-y-4">
						<Skeleton className="h-12 w-1/2" />
						<Skeleton className="h-6 w-1/4" />
						<Skeleton className="h-40 w-full" />
					</div>
				</div>
		);
	}

	if (!tvShow) return <div className="text-center py-20">{t("movieDetails.notFound")}</div>;

	const castList = tvShow.aggregate_credits?.cast?.slice(0, 10) || [];

	const recommendList = tvShow.recommendations?.results?.slice(0, 8) || [];

	const trailer = tvShow.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");

	const contentRating = tvShow.content_ratings?.results?.find(r => r.iso_3166_1 === "US")?.rating
			|| tvShow.content_ratings?.results?.[0]?.rating;

	return (
			<div className="min-h-screen bg-background text-foreground pb-12 mt-6">
				<div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
					<div className="w-full md:w-[300px] shrink-0 flex flex-col gap-6">
						<div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-muted aspect-[2/3]">
							{tvShow.poster_path ? (
									<img
											src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
											alt={tvShow.name}
											className="w-full h-full object-cover"
									/>
							) : (
									<div className="w-full h-full flex items-center justify-center">
										<Tv className="w-16 h-16 text-muted-foreground" />
									</div>
							)}
						</div>

						<div className="flex items-center gap-4 text-foreground px-1">
							{tvShow.external_ids?.facebook_id && (
									<a href={`https://facebook.com/${tvShow.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer">
										<FaFacebook className="w-6 h-6 hover:text-sky-500 cursor-pointer transition-colors" />
									</a>
							)}
							{tvShow.external_ids?.twitter_id && (
									<a href={`https://twitter.com/${tvShow.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer">
										<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer transition-colors" />
									</a>
							)}
							{tvShow.external_ids?.instagram_id && (
									<a href={`https://instagram.com/${tvShow.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer">
										<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
									</a>
							)}
							{tvShow.homepage && (
									<a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">
										<LinkIcon className="w-6 h-6 hover:text-emerald-500 cursor-pointer transition-colors" />
									</a>
							)}
						</div>

						<div className="space-y-4">
							<h3 className="font-bold text-xl">{t("movieDetails.status")}</h3>

							<div>
								<p className="font-bold text-sm">{t("movieDetails.status")}</p>
								<p className="text-sm text-muted-foreground">{tvShow.status}</p>
							</div>

							{contentRating && (
									<div>
										<p className="font-bold text-sm">{t("tvDetails.contentRating", "Phân loại")}</p>
										<Badge variant="secondary" className="mt-1">{contentRating}</Badge>
									</div>
							)}

							<div>
								<p className="font-bold text-sm">{t("tvDetails.type")}</p>
								<p className="text-sm text-muted-foreground">{tvShow.type}</p>
							</div>

							<div>
								<p className="font-bold text-sm">{t("movieDetails.originalLanguage")}</p>
								<p className="text-sm text-muted-foreground uppercase">{tvShow.original_language}</p>
							</div>

							{tvShow.networks.length > 0 && (
									<div>
										<p className="font-bold text-sm mb-2">{t("tvDetails.networks")}</p>
										<div className="flex flex-wrap gap-3 items-center">
											{tvShow.networks.map(net => net.logo_path ? (
													<div key={net.id} className="bg-white dark:bg-zinc-800 p-1.5 rounded-md border border-border shadow-xs max-h-10 flex items-center">
														<img
																src={`https://image.tmdb.org/t/p/w92${net.logo_path}`}
																alt={net.name}
																className="max-h-6 object-contain"
														/>
													</div>
											) : (
													<Badge key={net.id} variant="outline">{net.name}</Badge>
											))}
										</div>
									</div>
							)}

							<div>
								<p className="font-bold text-sm mb-2">{t("tvDetails.keywords", "Từ khóa")}</p>
								<div className="flex flex-wrap gap-2">
									{tvShow.keywords?.results && tvShow.keywords.results.length > 0 ? (
											tvShow.keywords.results.map(kw => (
													<Badge key={kw.id} variant="secondary" className="font-normal bg-muted">
														<Hash className="w-3 h-3 mr-1 opacity-50" />
														{kw.name}
													</Badge>
											))
									) : (
											<span className="text-sm text-muted-foreground">{t("tvDetails.noKeywords", "Chưa có từ khóa")}</span>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 min-w-0 flex flex-col gap-8">

						<div className="space-y-4">
							<h1 className="text-4xl font-extrabold tracking-tight flex flex-wrap items-center gap-3">
								{tvShow.name}
								<span className="text-2xl font-normal text-muted-foreground">
                                ({tvShow.first_air_date ? tvShow.first_air_date.substring(0,4) : "—"})
                            </span>
							</h1>

							<div className="flex flex-wrap items-center gap-4">
								<Badge variant="secondary" className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 font-bold border-none px-3 py-1.5 text-base">
									<Star className="w-5 h-5 fill-amber-500" />
									{Math.round(tvShow.vote_average * 10) / 10}
								</Badge>

								<div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
									<Calendar className="w-4 h-4" />
									{tvShow.first_air_date}
								</div>

								{trailer && (
										<a
												href={`https://www.youtube.com/watch?v=${trailer.key}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-sky-500 transition-colors ml-2"
										>
											<PlayCircle className="w-5 h-5" />
											{t("tvDetails.playTrailer", "Xem Trailer")}
										</a>
								)}
							</div>

							<div className="flex flex-wrap gap-2 pt-1">
								{tvShow.genres.map(g => (
										<Badge key={g.id} variant="outline" className="rounded-md px-3 py-1 text-sm font-medium border-border">
											{g.name}
										</Badge>
								))}
							</div>

							{tvShow.tagline && (
									<p className="text-lg italic text-muted-foreground font-medium pt-2">"{tvShow.tagline}"</p>
							)}

							<div className="space-y-2 pt-2">
								<h3 className="font-bold text-xl">{t("movieDetails.overview")}</h3>
								<p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
									{tvShow.overview || t("actorDetails.noBiography")}
								</p>
							</div>
						</div>

						{castList.length > 0 && (
								<div className="space-y-4">
									<h3 className="font-bold text-xl">{t("tvDetails.seriesCast")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{castList.map(cast => {
											// Aggregate Cast trả về mảng roles thay vì character
											const characterName = cast.roles?.[0]?.character || cast.character;
											const episodeCount = cast.roles?.[0]?.episode_count;

											return (
													<div
															key={cast.id}
															className="w-[120px] shrink-0 cursor-pointer group"
															onClick={() => navigate(PATHS.ACTORS.DETAIL(cast.id))}
													>
														<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-[2/3] bg-muted border border-border/50">
															{cast.profile_path ? (
																	<img
																			src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
																			alt={cast.name}
																			className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
																	/>
															) : (
																	<div className="w-full h-full flex items-center justify-center">
																		<User className="w-8 h-8 text-muted-foreground/50" />
																	</div>
															)}
														</div>
														<p className="text-sm font-bold truncate group-hover:text-sky-500">{cast.name}</p>
														<p className="text-xs text-foreground mt-0.5 truncate font-medium">{characterName}</p>
														{episodeCount && (
																<p className="text-[11px] text-muted-foreground mt-0.5">{episodeCount} tập</p>
														)}
													</div>
											);
										})}
									</div>
								</div>
						)}

						{tvShow.seasons.length > 0 && (
								<div className="space-y-4">
									<h3 className="font-bold text-xl">{t("tvDetails.seasons")}</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{tvShow.seasons.filter(s => s.season_number > 0).slice(0, 4).map(season => (
												<Card key={season.id} className="flex flex-row p-0 overflow-hidden border-border hover:shadow-md transition-shadow">
													<div className="w-[100px] h-[150px] bg-muted shrink-0 border-r border-border/50">
														{season.poster_path ? (
																<img
																		src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
																		alt={season.name}
																		className="w-full h-full object-cover"
																/>
														) : (
																<div className="w-full h-full flex items-center justify-center text-muted-foreground/30">🎬</div>
														)}
													</div>
													<div className="flex-1 p-5 flex flex-col justify-center min-w-0">
														<h4 className="font-bold text-lg truncate text-foreground">
															{season.name}
														</h4>
														<Badge variant="secondary" className="w-fit mt-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20">
															{t("tvDetails.episodesCount", { count: season.episode_count })}
														</Badge>
														<div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 font-medium">
															<Calendar className="w-3.5 h-3.5" />
															{season.air_date ? season.air_date.substring(0,4) : "—"}
														</div>
													</div>
												</Card>
										))}
									</div>
								</div>
						)}

						{recommendList.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("tvDetails.recommendations", "Có thể bạn sẽ thích")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{recommendList.map(movie => (
												<div
														key={movie.id}
														className="w-[200px] shrink-0 cursor-pointer group"
														onClick={() => navigate(PATHS.TV.DETAIL(movie.id))}
												>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-video bg-muted relative">
														{movie.backdrop_path ? (
																<img
																		src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
																		alt={movie.name}
																		className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
																/>
														) : (
																<div className="w-full h-full flex items-center justify-center">
																	<Tv className="w-8 h-8 text-muted-foreground/50" />
																</div>
														)}
													</div>
													<p className="text-sm font-bold truncate group-hover:text-sky-500">
														{movie.name}
													</p>
												</div>
										))}
									</div>
								</div>
						)}
					</div>

				</div>
			</div>
	);
};