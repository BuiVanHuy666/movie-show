import { Tv, MapPin, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { useTranslation } from "react-i18next";
import type { TVDetails } from "@/types/tvShow.ts";
import { SocialLinks } from "@/components/common/media/MediaSocialLinks.tsx";
import { KeywordsList } from "@/components/common/media/KeywordsList.tsx";

export const TVSidebar = ({ tvShow }: { tvShow: TVDetails }) => {
	const { t } = useTranslation();

	return (
			<div className="w-full md:w-75 shrink-0 flex flex-col gap-6">
				<div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-muted aspect-2/3">
					{tvShow.poster_path ? (
							<img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} className="w-full h-full object-cover" />
					) : (
							<div className="w-full h-full flex items-center justify-center">
								<Tv className="w-16 h-16 text-muted-foreground" />
							</div>
					)}
				</div>

				<SocialLinks externalIds={tvShow.external_ids} homepage={tvShow.homepage} />

				<div className="space-y-5 bg-card p-5 rounded-xl border border-border shadow-sm">
					<div>
						<p className="font-bold text-sm mb-1">{t("movieDetails.status")}</p>
						<Badge variant={tvShow.status === "Returning Series" ? "default" : "secondary"}>{tvShow.status}</Badge>
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
							{tvShow.production_countries.length > 0 ? tvShow.production_countries.map(c => c.name).join(", ") : tvShow.origin_country.join(", ")}
						</p>
					</div>

					<div>
						<p className="font-bold text-sm flex items-center gap-1"><Languages className="w-4 h-4"/> {t("tvDetails.spokenLanguages")}</p>
						<p className="text-sm text-muted-foreground mt-1">{tvShow.spoken_languages.map(l => l.english_name).join(", ")}</p>
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

					<KeywordsList keywords={tvShow.keywords?.results} />
				</div>
			</div>
	);
};