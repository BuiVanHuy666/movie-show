import { Calendar, Clapperboard } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useTranslation } from "react-i18next";
import type { Season } from "@/types/tvShow.ts";

export const SeasonsList = ({ seasons }: { seasons: Season[] }) => {
	const { t } = useTranslation();

	if (!seasons || seasons.length === 0) return null;

	return (
			<div className="space-y-4 pt-4 border-t border-border">
				<h3 className="font-bold text-xl">{t("tvDetails.seasons")}</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{seasons.filter(s => s.season_number > 0).slice(0, 4).map(season => (
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
	);
};