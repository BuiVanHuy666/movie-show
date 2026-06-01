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
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				{lastEpisode && (
						<div className="space-y-4">
							<h3 className="font-bold text-xl flex items-center gap-2">
								<MonitorPlay className="w-6 h-6 text-sky-500" />
								{t("tvDetails.lastEpisodeToAir")}
							</h3>
							<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50">
								<div className="sm:w-48 aspect-video bg-muted shrink-0 relative">
									{lastEpisode.still_path ? (
											<img src={`https://image.tmdb.org/t/p/w500${lastEpisode.still_path}`} alt={lastEpisode.name} className="w-full h-full object-cover" />
									) : (
											<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
									)}
									<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
										S{lastEpisode.season_number} E{lastEpisode.episode_number}
									</div>
								</div>
								<div className="p-4 flex flex-col justify-center">
									<h4 className="font-bold text-[15px] mb-1">{lastEpisode.name}</h4>
									<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
										<span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {lastEpisode.air_date}</span>
										<span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {lastEpisode.vote_average}</span>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-2">{lastEpisode.overview || t("tvDetails.updatingInfo")}</p>
								</div>
							</Card>
						</div>
				)}

				{nextEpisode && (
						<div className="space-y-4">
							<h3 className="font-bold text-xl flex items-center gap-2">
								<MonitorPlay className="w-6 h-6 text-emerald-500" />
								{t("tvDetails.nextEpisodeToAir")}
							</h3>
							<Card className="flex flex-col sm:flex-row overflow-hidden border-border bg-card/50">
								<div className="sm:w-48 aspect-video bg-muted shrink-0 relative">
									{nextEpisode.still_path ? (
											<img src={`https://image.tmdb.org/t/p/w500${nextEpisode.still_path}`} alt={nextEpisode.name} className="w-full h-full object-cover" />
									) : (
											<div className="w-full h-full flex items-center justify-center text-muted-foreground"><Tv className="w-8 h-8 opacity-50" /></div>
									)}
									<div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
										S{nextEpisode.season_number} E{nextEpisode.episode_number}
									</div>
								</div>
								<div className="p-4 flex flex-col justify-center">
									<h4 className="font-bold text-[15px] mb-1">{nextEpisode.name}</h4>
									<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
										<span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {nextEpisode.air_date}</span>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-2">{nextEpisode.overview || t("tvDetails.updatingInfo")}</p>
								</div>
							</Card>
						</div>
				)}
			</div>
	);
};