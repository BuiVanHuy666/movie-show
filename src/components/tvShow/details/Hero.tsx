import { Star, Clock, PlayCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { useTranslation } from "react-i18next";
import type { TVDetails } from "@/types/tvShow.ts";

interface TVMainInfoProps {
	tvShow: TVDetails;
	contentRating?: string;
	runTime: string;
	trailer?: { key: string } | null;
}

export const Hero = ({ tvShow, contentRating, runTime, trailer }: TVMainInfoProps) => {
	const { t } = useTranslation();

	return (
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
							<Badge variant="outline" className="border-border text-foreground font-bold bg-background">{contentRating}</Badge>
					)}

					<div className="flex items-center gap-1.5 text-sm text-foreground font-medium bg-secondary px-2 py-1 rounded-md">
						<Clock className="w-4 h-4" />
						{runTime}
					</div>

					{trailer && (
							<a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors ml-2">
								<PlayCircle className="w-5 h-5" />
								{t("tvDetails.playTrailer")}
							</a>
					)}
				</div>

				<div className="flex flex-wrap gap-2 pt-1">
					{tvShow.genres.map(g => (
							<Badge key={g.id} variant="outline" className="rounded-md px-3 py-1 text-sm font-medium border-border">{g.name}</Badge>
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
	);
};