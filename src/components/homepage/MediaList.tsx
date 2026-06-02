import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATHS } from "@/app/routes/routes.ts";
import { MovieService, TVService } from "@/services/mediaService.ts";
import { Skeleton } from "@/components/ui/skeleton";

import type { Movie } from "@/types/movie.ts";
import type { TvShow } from "@/types/tvShow.ts";

interface MediaSectionProps {
	title: string;
	mediaType: "movie" | "tv";
	sectionType: "trending" | "in_theaters" | "popular" | "on_the_air";
}

export const MediaList = ({ title, mediaType, sectionType }: MediaSectionProps) => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const [mediaItems, setMediaItems] = useState<(Movie | TvShow)[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

	useEffect(() => {
		const fetchMedia = async () => {
			setIsLoading(true);
			try {
				let data;

				if (mediaType === "movie") {
					if (sectionType === "trending") {
						data = await MovieService.getTrending(timeWindow);
					} else if (sectionType === "in_theaters") {
						data = await MovieService.getNowPlaying();
					}
				} else if (mediaType === "tv") {
					if (sectionType === "trending") {
						data = await TVService.getTrending(timeWindow);
					} else if (sectionType === "on_the_air") {
						data = await TVService.getTVShowsByType("on_the_air");
					} else if (sectionType === "popular") {
						data = await TVService.getTVShowsByType("popular");
					}
				}

				if (data?.results) {
					setMediaItems(data.results);
				}
			} catch (error) {
				console.error(`Lỗi tải dữ liệu ${mediaType} - ${sectionType}:`, error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMedia();
	}, [mediaType, sectionType, timeWindow, i18n.language]);

	const formatDate = (dateString?: string) => {
		if (!dateString) return "";
		return new Date(dateString).toLocaleDateString(
				i18n.language === "vi" ? "vi-VN" : "en-US",
				{ month: "short", day: "numeric", year: "numeric" }
		);
	};

	const handleNavigate = (id: number) => {
		if (mediaType === "movie") {
			navigate(PATHS.MOVIES.DETAIL(id));
		} else {
			navigate(PATHS.TV.DETAIL(id));
		}
	};

	const renderSkeletons = () => (
			<div className="flex gap-5 overflow-hidden">
				{Array.from({ length: 7 }).map((_, i) => (
						<div key={i} className="shrink-0 w-37.5 sm:w-40 flex flex-col gap-3">
							<Skeleton className="w-full aspect-2/3 rounded-xl" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-3 w-1/2" />
						</div>
				))}
			</div>
	);

	return (
			<section className="py-8">
				<div className="flex items-center gap-6 mb-6">
					<h2 className="text-2xl font-bold tracking-tight text-foreground">
						{title}
					</h2>

					{sectionType === "trending" && (
							<div className="flex items-center p-1 border rounded-full border-zinc-800 bg-zinc-950">
								<button
										onClick={() => setTimeWindow("day")}
										className={`px-5 py-1 text-sm font-semibold rounded-full transition-colors ${
												timeWindow === "day" ? "bg-emerald-900/40 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
										}`}
								>
									{t("home.today", "Today")}
								</button>
								<button
										onClick={() => setTimeWindow("week")}
										className={`px-5 py-1 text-sm font-semibold rounded-full transition-colors ${
												timeWindow === "week" ? "bg-emerald-900/40 text-emerald-400" : "text-zinc-400 hover:text-zinc-200"
										}`}
								>
									{t("home.thisWeek", "This Week")}
								</button>
							</div>
					)}

					{sectionType === "in_theaters" && mediaType === "movie" && (
							<div className="flex items-center p-1 rounded-full bg-teal-950 border border-teal-900 shadow-inner">
                        <span className="px-5 py-1 text-sm font-semibold rounded-full bg-teal-800 text-teal-200 transition-all cursor-default">
                            {t("home.inTheaters", "In Theaters")}
                        </span>
							</div>
					)}

					{sectionType === "on_the_air" && mediaType === "tv" && (
							<div className="flex items-center p-1 rounded-full bg-purple-950 border border-purple-900 shadow-inner">
                        <span className="px-5 py-1 text-sm font-semibold rounded-full bg-purple-800 text-purple-200 transition-all cursor-default">
                            {t("home.onTheAir", "On TV")}
                        </span>
							</div>
					)}
				</div>

				<div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
					{isLoading ? (
							renderSkeletons()
					) : (
							mediaItems.map((item) => {
								const displayTitle = 'title' in item ? item.title : item.name;
								const displayDate = 'release_date' in item ? item.release_date : item.first_air_date;

								return (
										<div
												key={item.id}
												className="shrink-0 w-37.5 sm:w-40 group cursor-pointer"
												onClick={() => handleNavigate(item.id)}
										>
											<div className="relative overflow-hidden rounded-xl aspect-2/3 mb-3 shadow-md bg-zinc-900 border border-border/50">
												<img
														src={
															item.poster_path
																	? `https://image.tmdb.org/t/p/w500${item.poster_path}`
																	: "https://via.placeholder.com/500x750?text=No+Poster"
														}
														alt={displayTitle}
														className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
														loading="lazy"
												/>
											</div>

											<h3 className="font-bold text-sm leading-tight text-foreground truncate-2-lines h-10" title={displayTitle}>
												{displayTitle}
											</h3>
											<p className="text-xs sm:text-sm text-zinc-500 mt-1">
												{formatDate(displayDate)}
											</p>
										</div>
								);
							})
					)}
				</div>
			</section>
	);
};