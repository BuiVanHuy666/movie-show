import { MonitorPlay, Calendar, Star, Tv } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";
import { useTranslation } from "react-i18next";
import type { Episode } from "@/types/tvShow.ts";

interface LatestEpisodesProps {
	lastEpisode: Episode | null;
	nextEpisode: Episode | null;
}

export const LatestEpisodes = ({ lastEpisode, nextEpisode }: LatestEpisodesProps) => {
	const { t } = useTranslation();

	return (
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
				{lastEpisode && (
						<div className="space-y-4 w-full min-w-0">
							<h3 className="font-bold text-lg md:text-xl flex items-center gap-2">
								<MonitorPlay className="w-5 h-5 md:w-6 md:h-6 text-sky-500 shrink-0" />
								{t("tvDetails.lastEpisodeToAir")}
							</h3>
							<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50 w-full">
								<div className="w-full sm:w-48 aspect-video bg-muted shrink-0 relative">
									{lastEpisode.still_path ? (
											<img src={`https://image.tmdb.org/t/p/w500${lastEpisode.still_path}`} alt={lastEpisode.name} className="w-full h-full object-cover" />
									) : (
											<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
									)}
									<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
										S{lastEpisode.season_number} E{lastEpisode.episode_number}
									</div>
								</div>
								<div className="p-4 flex flex-col justify-center min-w-0 flex-1">
									<h4 className="font-bold text-[15px] mb-1 truncate">{lastEpisode.name}</h4>
									<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
										<span className="flex items-center gap-1 whitespace-nowrap"><Calendar className="w-3.5 h-3.5" /> {lastEpisode.air_date}</span>
										<span className="flex items-center gap-1 whitespace-nowrap"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {lastEpisode.vote_average}</span>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-2 break-words">{lastEpisode.overview || t("tvDetails.updatingInfo")}</p>
								</div>
							</Card>
						</div>
				)}

				{nextEpisode && (
						<div className="space-y-4 w-full min-w-0">
							<h3 className="font-bold text-lg md:text-xl flex items-center gap-2">
								<MonitorPlay className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 shrink-0" />
								{t("tvDetails.nextEpisodeToAir")}
							</h3>
							<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50 w-full">
								<div className="w-full sm:w-48 aspect-video bg-muted shrink-0 relative">
									{nextEpisode.still_path ? (
											<img src={`https://image.tmdb.org/t/p/w500${nextEpisode.still_path}`} alt={nextEpisode.name} className="w-full h-full object-cover" />
									) : (
											<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
									)}
									<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
										S{nextEpisode.season_number} E{nextEpisode.episode_number}
									</div>
								</div>
								<div className="p-4 flex flex-col justify-center min-w-0 flex-1">
									<h4 className="font-bold text-[15px] mb-1 truncate">{nextEpisode.name}</h4>
									<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
										<span className="flex items-center gap-1 whitespace-nowrap"><Calendar className="w-3.5 h-3.5" /> {nextEpisode.air_date}</span>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-2 break-words">{nextEpisode.overview || t("tvDetails.updatingInfo")}</p>
								</div>
							</Card>
						</div>
				)}
			</div>
	);
};