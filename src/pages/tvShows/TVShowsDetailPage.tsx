import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { MediaPersonList } from "@/components/common/media/MediaPersonList.tsx";
import { MediaList } from "@/components/common/media/MediaList.tsx";
import { TVSidebar } from "@/components/tvShow/details/SideBar.tsx";
import { LatestEpisodes } from "@/components/tvShow/details/LatestEpisodes.tsx";
import { Hero } from "@/components/tvShow/details/Hero.tsx";
import { SeasonsList } from "@/components/tvShow/details/SeasonList.tsx";

import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";
import { useTvShowDetails } from "@/hooks/useTvShowDetails.ts";

export const TVShowsDetailPage = () =>
	{
		const {tvId} = useParams<{
			tvId: string
		}>();
		const {
			t,
			i18n
		} = useTranslation();

		const {
			tvShow,
			isLoading
		} = useTvShowDetails(tvId, i18n.language);

		useDocumentTitle(tvShow?.name || t("tvDetails.loadingTitle"), true);

		if (isLoading) {
			return (
					<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
						<Skeleton className="w-full h-100 rounded-xl"/>
						<div className="flex flex-col md:flex-row gap-8">
							<Skeleton className="w-full md:w-75 h-112.5 rounded-xl shrink-0"/>
							<div className="flex-1 space-y-4">
								<Skeleton className="h-12 w-1/2"/>
								<Skeleton className="h-6 w-1/4"/>
								<Skeleton className="h-40 w-full"/>
							</div>
						</div>
					</div>
			);
		}

		if (!tvShow) return <div className="text-center py-20">{t("movieDetails.notFound")}</div>;

		const castList = tvShow.aggregate_credits?.cast?.slice(0, 10) || [];
		const crewList = tvShow.aggregate_credits?.crew?.filter(c => c.popularity > 0.05)
				.slice(0, 10) || [];
		const recommendList = tvShow.recommendations?.results?.slice(0, 8) || [];
		const similarList = tvShow.similar?.results?.slice(0, 8) || [];
		const trailer = tvShow.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube") || tvShow.videos?.results?.[0];
		const contentRating = tvShow.content_ratings?.results?.find(r => r.iso_3166_1 === "US")?.rating || tvShow.content_ratings?.results?.[0]?.rating;
		const runTime = tvShow.episode_run_time?.length > 0 ? `${tvShow.episode_run_time[0]} ${t("movieDetails.minutes")}` : t("movieDetails.updating");

		return (
				<div className="min-h-screen bg-background text-foreground pb-12 overflow-x-hidden w-full">
					{tvShow.backdrop_path && (
							<div className="relative w-full h-100 md:h-125">
								<img src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`} alt="Backdrop" className="w-full h-full object-cover"/>
								<div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"/>
							</div>
					)}

					<div className={`container mx-auto px-4 flex flex-col md:flex-row gap-6 md:gap-8 items-start ${tvShow.backdrop_path ? '-mt-48 relative z-10' : 'mt-6'}`}>
						<TVSidebar tvShow={tvShow}/>

						<div className="flex-1 w-full min-w-0 flex flex-col gap-8 overflow-hidden">
							<Hero tvShow={tvShow} contentRating={contentRating} runTime={runTime} trailer={trailer}/>

							<LatestEpisodes lastEpisode={tvShow.last_episode_to_air} nextEpisode={tvShow.next_episode_to_air}/>

							<MediaPersonList title={t("tvDetails.seriesCast")} data={castList} episodesText={t("tvDetails.episodes")}/>

							<MediaPersonList title={t("tvDetails.seriesCrew")} data={crewList} episodesText={t("tvDetails.episodes")}/>

							<SeasonsList seasons={tvShow.seasons}/>

							<MediaList title={t("tvDetails.similarShows")} data={similarList} mediaType="tv"/>
							<MediaList title={t("tvDetails.recommendations")} data={recommendList} mediaType="tv"/>
						</div>
					</div>
				</div>
		);
	};