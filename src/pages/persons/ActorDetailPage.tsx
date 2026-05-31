import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { User, Link as LinkIcon } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaImdb } from "react-icons/fa";
import { PATHS } from "@/app/routes/routes.ts";
import { Button } from "@/components/ui/button.tsx";
import { PersonService } from "@/services/mediaService.ts";
import type { PersonDetails } from "@/types/person.ts";
import { calculateAge } from "@/utils/personUtils.ts";

export const ActorDetailPage = () => {
	const { actorId } = useParams<{ actorId: string }>();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const [isBioExpanded, setIsBioExpanded] = useState(false);
	const [isBioOverflowing, setIsBioOverflowing] = useState(false);
	const bioRef = useRef<HTMLParagraphElement>(null);

	const [isCastExpanded, setIsCastExpanded] = useState(false);
	const [isCrewExpanded, setIsCrewExpanded] = useState(false);

	const [actor, setActor] = useState<PersonDetails | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (bioRef.current) {
			const lineHeight = 24;
			const maxHeight = lineHeight * 6;
			if (bioRef.current.scrollHeight > maxHeight) {
				setIsBioOverflowing(true);
			}
		}
	}, [actor?.biography]);

	useEffect(() => {
		if (!actorId) return;

		const fetchActorData = async () => {
			setIsLoading(true);
			try {
				const data = await PersonService.getDetails(
						parseInt(actorId),
						"&append_to_response=combined_credits,external_ids"
				);
				setActor(data);
			} catch (error) {
				console.error("Error when fetching actor details:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchActorData();
	}, [actorId, i18n.language]);

	if (isLoading) {
		return (
				<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
					<Skeleton className="w-full md:w-75 h-112.5 rounded-xl shrink-0" />
					<div className="flex-1 space-y-4">
						<Skeleton className="h-12 w-1/2" />
						<Skeleton className="h-6 w-1/4" />
						<Skeleton className="h-32 w-full" />
					</div>
				</div>
		);
	}

	if (!actor) return <div className="text-center py-20">{t("movieDetails.notFound")}</div>;

	const age = calculateAge(actor.birthday, actor.deathday);

	const totalCredits = (actor.combined_credits?.cast?.length || 0) + (actor.combined_credits?.crew?.length || 0);

	const knownForMovies = actor.combined_credits?.cast
			?.filter(c => c.poster_path)
			?.sort((a, b) => b.vote_count - a.vote_count)
			?.slice(0, 8) || [];

	const actingHistory = actor.combined_credits?.cast
			?.map(c => ({
				...c,
				release_year: (c.release_date || c.first_air_date || "").substring(0, 4)
			}))
			.sort((a, b) => {
				if (!a.release_year) return -1;
				if (!b.release_year) return 1;
				return parseInt(b.release_year) - parseInt(a.release_year);
			}) || [];

	const crewHistory = actor.combined_credits?.crew
			?.map(c => ({
				...c,
				release_year: (c.release_date || c.first_air_date || "").substring(0, 4)
			}))
			.sort((a, b) => {
				if (!a.release_year) return -1;
				if (!b.release_year) return 1;
				return parseInt(b.release_year) - parseInt(a.release_year);
			}) || [];

	const handleNavigate = (mediaType: string, id: number) => {
		if (mediaType === "tv") {
			navigate(PATHS.TV.DETAIL(id));
		} else {
			navigate(PATHS.MOVIES.DETAIL(id));
		}
	};

	return (
			<div className="min-h-screen bg-background text-foreground pb-12 mt-6">
				<div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">

					<div className="w-full md:w-75 shrink-0 flex flex-col gap-6">
						<div className="rounded-xl overflow-hidden shadow-lg border border-border bg-muted">
							{actor.profile_path ? (
									<img
											src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
											alt={actor.name}
											className="w-full h-auto object-cover"
									/>
							) : (
									<div className="w-full aspect-2/3 flex items-center justify-center">
										<User className="w-20 h-20 text-muted-foreground" />
									</div>
							)}
						</div>

						<div className="flex flex-wrap items-center gap-4 text-foreground">
							{actor.external_ids?.facebook_id && (
									<a href={`https://facebook.com/${actor.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer" title="Facebook">
										<FaFacebook className="w-6 h-6 hover:text-sky-500 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.external_ids?.twitter_id && (
									<a href={`https://twitter.com/${actor.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer" title="Twitter/X">
										<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.external_ids?.instagram_id && (
									<a href={`https://instagram.com/${actor.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer" title="Instagram">
										<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.external_ids?.tiktok_id && (
									<a href={`https://tiktok.com/@${actor.external_ids.tiktok_id}`} target="_blank" rel="noopener noreferrer" title="TikTok">
										<FaTiktok className="w-6 h-6 hover:text-zinc-500 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.external_ids?.youtube_id && (
									<a href={`https://youtube.com/${actor.external_ids.youtube_id}`} target="_blank" rel="noopener noreferrer" title="YouTube">
										<FaYoutube className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.external_ids?.imdb_id && (
									<a href={`https://www.imdb.com/name/${actor.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer" title="IMDb">
										<FaImdb className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition-colors" />
									</a>
							)}
							{actor.homepage && (
									<a href={actor.homepage} target="_blank" rel="noopener noreferrer" title="Personal Website">
										<LinkIcon className="w-6 h-6 hover:text-emerald-500 cursor-pointer transition-colors" />
									</a>
							)}
						</div>

						<div className="space-y-4">
							<h3 className="font-bold text-xl">{t("actorDetails.personalInfo", "Personal Info")}</h3>

							<div>
								<p className="font-bold text-sm">{t("actorDetails.knownFor", "Known For")}</p>
								<p className="text-sm text-muted-foreground">{actor.known_for_department}</p>
							</div>

							<div>
								<p className="font-bold text-sm">{t("actorDetails.knownCredits", "Known Credits")}</p>
								<p className="text-sm text-muted-foreground">{totalCredits}</p>
							</div>

							<div>
								<p className="font-bold text-sm">{t("actorDetails.gender", "Gender")}</p>
								<p className="text-sm text-muted-foreground">
									{actor.gender === 1 ? t("actorDetails.female", "Female") : actor.gender === 2 ? t("actorDetails.male", "Male") : t("actorDetails.notSpecified", "Not specified")}
								</p>
							</div>

							<div>
								<p className="font-bold text-sm">{t("actorDetails.birthday", "Birthday")}</p>
								<p className="text-sm text-muted-foreground">
									{actor.birthday || t("movieDetails.noInfo", "No info")}
									{actor.birthday && !actor.deathday && age !== null && (
											<span className="ml-1">
                                                ({t("actorDetails.yearsOld", { age: `${age} years old` })})
                                            </span>
									)}
								</p>
							</div>

							{actor.deathday && (
									<div>
										<p className="font-bold text-sm">{t("actorDetails.deathday", "Day of Death")}</p>
										<p className="text-sm text-muted-foreground">
											{actor.deathday}
											{age !== null && (
													<span className="ml-1">
                                                        ({t("actorDetails.passedAway", { age: `${age} years old` })})
                                                    </span>
											)}
										</p>
									</div>
							)}

							<div>
								<p className="font-bold text-sm">{t("actorDetails.placeOfBirth", "Place of Birth")}</p>
								<p className="text-sm text-muted-foreground">{actor.place_of_birth || t("movieDetails.noInfo", "No info")}</p>
							</div>

							{actor.also_known_as.length > 0 && (
									<div>
										<p className="font-bold text-sm mb-1">{t("actorDetails.alsoKnownAs", "Also Known As")}</p>
										<div className="flex flex-col gap-1">
											{actor.also_known_as.map((name, i) => (
													<p key={i} className="text-sm text-muted-foreground">{name}</p>
											))}
										</div>
									</div>
							)}
						</div>
					</div>

					<div className="flex-1 min-w-0 flex flex-col gap-8">
						<div className="space-y-4">
							<h1 className="text-4xl font-extrabold tracking-tight">{actor.name}</h1>
							<div className="space-y-2">
								<h3 className="font-bold text-xl">{t("actorDetails.biography", "Biography")}</h3>
								<p ref={bioRef}
								   className={`text-base text-muted-foreground leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
										   !isBioExpanded ? "line-clamp-6" : ""
								   }`}
								>
									{actor.biography || t("actorDetails.noBiography", "We don't have a biography for this person.")}
								</p>

								{isBioOverflowing && (
										<button
												onClick={() => setIsBioExpanded(!isBioExpanded)}
												className="mt-2 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors"
										>
											{isBioExpanded ? t("showLess") : t("showMore")}
										</button>
								)}
							</div>
						</div>

						{knownForMovies.length > 0 && (
								<div className="space-y-4 overflow-hidden">
									<h3 className="font-bold text-xl">{t("actorDetails.knownFor", "Known For")}</h3>
									<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
										{knownForMovies.map(movie => (
												<div
														key={movie.credit_id}
														className="w-32.5 shrink-0 cursor-pointer group"
														onClick={() => handleNavigate(movie.media_type || "movie", movie.id)}
												>
													<div className="rounded-lg overflow-hidden shadow-sm mb-2">
														<img
																src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
																alt={movie.title || movie.name}
																className="w-full h-48.75 object-cover group-hover:scale-105 transition-transform"
														/>
													</div>
													<p className="text-sm font-semibold truncate group-hover:text-sky-500 text-center">
														{movie.title || movie.name}
													</p>
												</div>
										))}
									</div>
								</div>
						)}

						{actingHistory.length > 0 && (
								<div className="space-y-4">
									<h3 className="font-bold text-xl">{t("actorDetails.acting", "Acting")}</h3>
									<Card className="shadow-sm border-border overflow-hidden">
										{(isCastExpanded ? actingHistory : actingHistory.slice(0, 8)).map((credit) => (
												<div
														key={credit.credit_id}
														className="flex gap-4 p-4 border-b border-border last:border-none hover:bg-muted/50 transition-colors"
												>
													<div className="w-12 shrink-0 font-medium text-center text-muted-foreground">
														{credit.release_year || "—"}
													</div>
													<div className="flex flex-col items-center">
														<div className="w-2 h-2 rounded-full bg-border mt-2" />
													</div>
													<div className="flex-1">
														<p
																className="font-bold cursor-pointer hover:text-sky-500 transition-colors inline-block"
																onClick={() => handleNavigate(credit.media_type || "movie", credit.id)}
														>
															{credit.title || credit.name}
														</p>
														{credit.character && (
																<p className="text-sm text-muted-foreground mt-1">
																	as <span className="text-foreground">{credit.character}</span>
																</p>
														)}
													</div>
												</div>
										))}

										{actingHistory.length > 8 && (
												<div className="p-2 border-t border-border bg-muted/30">
													<Button
															variant="ghost"
															className="w-full text-sky-500 hover:text-sky-600 font-semibold"
															onClick={() => setIsCastExpanded(!isCastExpanded)}
													>
														{isCastExpanded ? t("showLess", "Collapse") : t("showMore", { count: actingHistory.length - 8 })}
													</Button>
												</div>
										)}
									</Card>
								</div>
						)}

						{crewHistory.length > 0 && (
								<div className="space-y-4">
									<h3 className="font-bold text-xl">{t("actorDetails.production", "Production / Crew")}</h3>
									<Card className="shadow-sm border-border overflow-hidden">
										{(isCrewExpanded ? crewHistory : crewHistory.slice(0, 8)).map((credit, index) => (
												<div
														key={credit.credit_id + index}
														className="flex gap-4 p-4 border-b border-border last:border-none hover:bg-muted/50 transition-colors"
												>
													<div className="w-12 shrink-0 font-medium text-center text-muted-foreground">
														{credit.release_year || "—"}
													</div>
													<div className="flex flex-col items-center">
														<div className="w-2 h-2 rounded-full bg-border mt-2" />
													</div>
													<div className="flex-1">
														<p
																className="font-bold cursor-pointer hover:text-sky-500 transition-colors inline-block"
																onClick={() => handleNavigate(credit.media_type || "movie", credit.id)}
														>
															{credit.title || credit.name}
														</p>
														{credit.job && (
																<p className="text-sm text-muted-foreground mt-1">
																	as <span className="text-foreground font-medium">{credit.job}</span>
																</p>
														)}
													</div>
												</div>
										))}

										{crewHistory.length > 8 && (
												<div className="p-2 border-t border-border bg-muted/30">
													<Button
															variant="ghost"
															className="w-full text-sky-500 hover:text-sky-600 font-semibold"
															onClick={() => setIsCrewExpanded(!isCrewExpanded)}
													>
														{isCrewExpanded ? t("showLess", "Collapse") : t("showMore", { count: crewHistory.length - 8 })}
													</Button>
												</div>
										)}
									</Card>
								</div>
						)}

					</div>
				</div>
			</div>
	);
};