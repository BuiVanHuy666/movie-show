import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/app/routes/routes";
import {
	Tv, Calendar, Star, Link as LinkIcon, User, PlayCircle,
	Clock, MonitorPlay, Clapperboard, Languages, MapPin, Users
} from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { TVService } from "@/services/mediaService.ts";
import type { TVDetails } from "@/types/tvShow.ts";

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
				const data = await TVService.getDetails(
						parseInt(tvId),
						"&append_to_response=aggregate_credits,external_ids,similar,recommendations,videos,keywords,content_ratings"
				);
				setTvShow(data);
			} catch (error) {
				console.error("Error when fetch TV show detail:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTVData();
	}, [tvId, i18n.language]);

	if (isLoading) {
		return (
				<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
					<Skeleton className="w-full h-100 rounded-xl" />
					<div className="flex flex-col md:flex-row gap-8">
						<Skeleton className="w-full md:w-75 h-112.5 rounded-xl shrink-0" />
						<div className="flex-1 space-y-4">
							<Skeleton className="h-12 w-1/2" />
							<Skeleton className="h-6 w-1/4" />
							<Skeleton className="h-40 w-full" />
						</div>
					</div>
				</div>
		);
	}

	if (!tvShow) return <div className="text-center py-20">{t("movieDetails.notFound")}</div>;

	const castList = tvShow.aggregate_credits?.cast?.slice(0, 10) || [];
	const crewList = tvShow.aggregate_credits?.crew?.filter(c => c.popularity > 0.05).slice(0, 10) || [];
	const recommendList = tvShow.recommendations?.results?.slice(0, 8) || [];
	const similarList = tvShow.similar?.results?.slice(0, 8) || [];
	const trailer = tvShow.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube") || tvShow.videos?.results?.[0];
	const contentRating = tvShow.content_ratings?.results?.find(r => r.iso_3166_1 === "US")?.rating || tvShow.content_ratings?.results?.[0]?.rating;

	const runTime = tvShow.episode_run_time?.length > 0 ? `${tvShow.episode_run_time[0]} ${t("movieDetails.minutes")}` : t("movieDetails.updating");

	return (
			<div className="min-h-screen bg-background text-foreground pb-12">
				{tvShow.backdrop_path && (
						<div className="relative w-full h-100 md:h-125">
							<img
									src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
									alt="Backdrop"
									className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
						</div>
				)}

				<div className={`container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start ${tvShow.backdrop_path ? '-mt-48 relative z-10' : 'mt-6'}`}>

					<div className="w-full md:w-75 shrink-0 flex flex-col gap-6">
						<div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-muted aspect-2/3">
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

						<div className="flex items-center gap-4 text-foreground px-1 justify-center md:justify-start">
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

						<div className="space-y-5 bg-card p-5 rounded-xl border border-border shadow-sm">
							<div>
								<p className="font-bold text-sm mb-1">{t("movieDetails.status")}</p>
								<Badge variant={tvShow.status === "Returning Series" ? "default" : "secondary"}>
									{tvShow.status}
								</Badge>
								{tvShow.in_production && <Badge variant="outline" className="ml-2">{t("tvDetails.inProduction")}</Badge>}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="font-bold text-sm">{t("tvDetails.seasonsCount")}</p>
									<p className="text-sm text-muted-foreground">{tvShow.number_of_seasons}</p>
								</div>
								<div>
									<p className="font-bold text-sm">{t("tvDetails.episodesCountInfo")}</p>
									<p className="text-sm text-muted-foreground">{tvShow.number_of_episodes}</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="font-bold text-sm">{t("tvDetails.firstAirDate")}</p>
									<p className="text-sm text-muted-foreground">{tvShow.first_air_date}</p>
								</div>
								<div>
									<p className="font-bold text-sm">{t("tvDetails.lastAirDate")}</p>
									<p className="text-sm text-muted-foreground">{tvShow.last_air_date}</p>
								</div>
							</div>

							<div>
								<p className="font-bold text-sm flex items-center gap-1"><MapPin className="w-4 h-4"/> {t("tvDetails.productionCountries")}</p>
								<p className="text-sm text-muted-foreground mt-1">
									{tvShow.production_countries.length > 0
											? tvShow.production_countries.map(c => c.name).join(", ")
											: tvShow.origin_country.join(", ")}
								</p>
							</div>

							<div>
								<p className="font-bold text-sm flex items-center gap-1"><Languages className="w-4 h-4"/> {t("tvDetails.spokenLanguages")}</p>
								<p className="text-sm text-muted-foreground mt-1">
									{tvShow.spoken_languages.map(l => l.english_name).join(", ")}
								</p>
							</div>

							{tvShow.networks.length > 0 && (
									<div>
										<p className="font-bold text-sm mb-2">{t("tvDetails.networks")}</p>
										<div className="flex flex-wrap gap-2 items-center">
											{tvShow.networks.map(net => net.logo_path ? (
													<div key={net.id} className="bg-white p-1 rounded border border-border flex items-center">
														<img src={`https://image.tmdb.org/t/p/w92${net.logo_path}`} alt={net.name} className="h-4 object-contain" />
													</div>
											) : (
													<Badge key={net.id} variant="outline">{net.name}</Badge>
											))}
										</div>
									</div>
							)}

							{tvShow.production_companies.length > 0 && (
									<div>
										<p className="font-bold text-sm mb-2 text-foreground">{t("tvDetails.production")}</p>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{tvShow.production_companies.map(p => p.name).join(", ")}
										</p>
									</div>
							)}

							<div>
								<p className="font-bold text-sm mb-2">{t("tvDetails.keywords")}</p>
								<div className="flex flex-wrap gap-2">
									{tvShow.keywords?.results && tvShow.keywords.results.length > 0 ? (
											tvShow.keywords.results.map(kw => (
													<Badge key={kw.id} variant="secondary" className="font-normal bg-muted text-xs">
														{kw.name}
													</Badge>
											))
									) : (
											<span className="text-sm text-muted-foreground">{t("tvDetails.noKeywords")}</span>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 min-w-0 flex flex-col gap-8">
						<div className="space-y-4 pt-4">
							<h1 className="text-4xl font-extrabold tracking-tight flex flex-wrap items-center gap-3 drop-shadow-sm">
								{tvShow.name}
								<span className="text-2xl font-normal text-muted-foreground">
                         ({tvShow.first_air_date ? tvShow.first_air_date.substring(0, 4) : "—"})
                      </span>
							</h1>
							{tvShow.original_name !== tvShow.name && (
									<p className="text-muted-foreground font-medium italic">{t("movieDetails.originalTitle")}: {tvShow.original_name}</p>
							)}

							<div className="flex flex-wrap items-center gap-4">
								<Badge variant="secondary" className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 font-bold border-none px-3 py-1.5 text-base">
									<Star className="w-5 h-5 fill-amber-500" />
									{Math.round(tvShow.vote_average * 10) / 10}
									<span className="text-xs font-normal opacity-70">({tvShow.vote_count} {t("tvDetails.votes")})</span>
								</Badge>

								{contentRating && (
										<Badge variant="outline" className="border-border text-foreground font-bold bg-background">
											{contentRating}
										</Badge>
								)}

								<div className="flex items-center gap-1.5 text-sm text-foreground font-medium bg-secondary px-2 py-1 rounded-md">
									<Clock className="w-4 h-4" />
									{runTime}
								</div>

								{trailer && (
										<a
												href={`https://www.youtube.com/watch?v=${trailer.key}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1.5 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors ml-2"
										>
											<PlayCircle className="w-5 h-5" />
											{t("tvDetails.playTrailer")}
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
									<p className="text-lg italic text-muted-foreground font-medium pt-2 border-l-4 border-muted pl-4">"{tvShow.tagline}"</p>
							)}

							<div className="space-y-2 pt-2">
								<h3 className="font-bold text-xl">{t("movieDetails.overview")}</h3>
								<p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
									{tvShow.overview || t("actorDetails.noBiography")}
								</p>
							</div>

							{tvShow.created_by.length > 0 && (
									<div className="pt-4 flex flex-wrap gap-6">
										{tvShow.created_by.map(creator => (
												<div key={creator.id} className="flex items-center gap-3">
													<div className="w-12 h-12 rounded-full bg-muted overflow-hidden border border-border shrink-0">
														{creator.profile_path ? (
																<img src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`} alt={creator.name} className="w-full h-full object-cover" />
														) : (
																<User className="w-full h-full p-2 text-muted-foreground/50" />
														)}
													</div>
													<div>
														<p className="font-bold text-sm">{creator.name}</p>
														<p className="text-xs text-muted-foreground">{t("tvDetails.creator")}</p>
													</div>
												</div>
										))}
									</div>
							)}
						</div>

						<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
							{tvShow.last_episode_to_air && (
									<div className="space-y-4">
										<h3 className="font-bold text-xl flex items-center gap-2">
											<MonitorPlay className="w-6 h-6 text-sky-500" />
											{t("tvDetails.lastEpisodeToAir")}
										</h3>
										<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50">
											<div className="sm:w-48 aspect-video bg-muted shrink-0 relative">
												{tvShow.last_episode_to_air.still_path ? (
														<img src={`https://image.tmdb.org/t/p/w500${tvShow.last_episode_to_air.still_path}`} alt={tvShow.last_episode_to_air.name} className="w-full h-full object-cover" />
												) : (
														<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
												)}
												<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
													S{tvShow.last_episode_to_air.season_number} E{tvShow.last_episode_to_air.episode_number}
												</div>
											</div>
											<div className="p-4 flex flex-col justify-center">
												<h4 className="font-bold text-[15px] mb-1">{tvShow.last_episode_to_air.name}</h4>
												<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
													<span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {tvShow.last_episode_to_air.air_date}</span>
													<span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {tvShow.last_episode_to_air.vote_average}</span>
												</div>
												<p className="text-xs text-muted-foreground line-clamp-2">{tvShow.last_episode_to_air.overview || t("tvDetails.updatingInfo")}</p>
											</div>
										</Card>
									</div>
							)}

							{tvShow.next_episode_to_air && (
									<div className="space-y-4">
										<h3 className="font-bold text-xl flex items-center gap-2">
											<MonitorPlay className="w-6 h-6 text-emerald-500" />
											{t("tvDetails.nextEpisodeToAir")}
										</h3>
										<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50">
											<div className="sm:w-48 aspect-video bg-muted shrink-0 relative">
												{tvShow.next_episode_to_air.still_path ? (
														<img src={`https://image.tmdb.org/t/p/w500${tvShow.next_episode_to_air.still_path}`} alt={tvShow.next_episode_to_air.name} className="w-full h-full object-cover" />
												) : (
														<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
												)}
												<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
													S{tvShow.next_episode_to_air.season_number} E{tvShow.next_episode_to_air.episode_number}
												</div>
											</div>
											<div className="p-4 flex flex-col justify-center">
												<h4 className="font-bold text-[15px] mb-1">{tvShow.next_episode_to_air.name}</h4>
												<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
													<span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {tvShow.next_episode_to_air.air_date}</span>
												</div>
												<p className="text-xs text-muted-foreground line-clamp-2">{tvShow.next_episode_to_air.overview || t("tvDetails.updatingInfo")}</p>
											</div>
										</Card>
									</div>
							)}
						</div>

						{castList.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl flex items-center gap-2"><Users className="w-5 h-5"/> {t("tvDetails.seriesCast")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{castList.map(cast => {
											const characterName = cast.roles?.[0]?.character;
											const episodeCount = cast.roles?.[0]?.episode_count;

											return (
													<div
															key={cast.id}
															className="w-32 shrink-0 cursor-pointer group"
															onClick={() => navigate(PATHS.ACTORS.DETAIL(cast.id))}
													>
														<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-2/3 bg-muted border border-border/50">
															{cast.profile_path ? (
																	<img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt={cast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
															) : (
																	<div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-muted-foreground/50" /></div>
															)}
														</div>
														<p className="text-sm font-bold truncate group-hover:text-sky-500">{cast.name}</p>
														<p className="text-xs text-foreground mt-0.5 truncate font-medium">{characterName}</p>
														{episodeCount && <p className="text-[11px] text-muted-foreground mt-0.5">{episodeCount} {t("tvDetails.episodes")}</p>}
													</div>
											);
										})}
									</div>
								</div>
						)}

						{crewList.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("tvDetails.seriesCrew")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{crewList.map((crew, index) => {
											const jobName = crew.jobs?.[0]?.job;
											const episodeCount = crew.jobs?.[0]?.episode_count;

											return (
													<div
															key={`${crew.id}-${index}`}
															className="w-32 shrink-0 cursor-pointer group"
															onClick={() => navigate(PATHS.ACTORS.DETAIL(crew.id))}
													>
														<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-2/3 bg-muted border border-border/50">
															{crew.profile_path ? (
																	<img src={`https://image.tmdb.org/t/p/w200${crew.profile_path}`} alt={crew.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
															) : (
																	<div className="w-full h-full flex items-center justify-center"><User className="w-8 h-8 text-muted-foreground/50" /></div>
															)}
														</div>
														<p className="text-sm font-bold truncate group-hover:text-sky-500">{crew.name}</p>
														<p className="text-xs text-foreground mt-0.5 truncate font-medium">{jobName}</p>
														{episodeCount && <p className="text-[11px] text-muted-foreground mt-0.5">{episodeCount} {t("tvDetails.episodes")}</p>}
													</div>
											);
										})}
									</div>
								</div>
						)}

						{tvShow.seasons.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("tvDetails.seasons")}</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{tvShow.seasons.filter(s => s.season_number > 0).slice(0, 4).map(season => (
												<Card key={season.id} className="flex flex-row p-0 overflow-hidden border-border hover:shadow-md transition-shadow">
													<div className="w-24 md:w-28 bg-muted shrink-0 border-r border-border/50">
														{season.poster_path ? (
																<img src={`https://image.tmdb.org/t/p/w200${season.poster_path}`} alt={season.name} className="w-full h-full object-cover" />
														) : (
																<div className="w-full h-full flex items-center justify-center text-muted-foreground/30"><Clapperboard className="w-8 h-8 opacity-50"/></div>
														)}
													</div>
													<div className="flex-1 p-4 flex flex-col justify-center min-w-0">
														<h4 className="font-bold text-base md:text-lg truncate text-foreground">{season.name}</h4>
														<Badge variant="secondary" className="w-fit mt-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20">
															{season.episode_count} {t("tvDetails.episodes")}
														</Badge>
														<div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 font-medium">
															<Calendar className="w-3.5 h-3.5" />
															{season.air_date ? season.air_date.substring(0, 4) : "—"}
														</div>
													</div>
												</Card>
										))}
									</div>
								</div>
						)}

						{similarList.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("tvDetails.similarShows")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{similarList.map(movie => (
												<div key={movie.id} className="w-56 shrink-0 cursor-pointer group" onClick={() => navigate(PATHS.TV.DETAIL(movie.id))}>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-video bg-muted relative">
														{movie.backdrop_path ? (
																<img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={movie.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
														) : (
																<div className="w-full h-full flex items-center justify-center"><Tv className="w-8 h-8 text-muted-foreground/50" /></div>
														)}
													</div>
													<p className="text-sm font-bold truncate group-hover:text-sky-500">{movie.name}</p>
												</div>
										))}
									</div>
								</div>
						)}

						{recommendList.length > 0 && (
								<div className="space-y-4 pt-4 border-t border-border">
									<h3 className="font-bold text-xl">{t("tvDetails.recommendations")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{recommendList.map(movie => (
												<div key={movie.id} className="w-56 shrink-0 cursor-pointer group" onClick={() => navigate(PATHS.TV.DETAIL(movie.id))}>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-video bg-muted relative">
														{movie.backdrop_path ? (
																<img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} alt={movie.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
														) : (
																<div className="w-full h-full flex items-center justify-center"><Tv className="w-8 h-8 text-muted-foreground/50" /></div>
														)}
													</div>
													<p className="text-sm font-bold truncate group-hover:text-sky-500">{movie.name}</p>
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