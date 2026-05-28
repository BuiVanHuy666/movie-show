import type { Cast } from "@/types/movie.ts";
import { useTranslation } from "react-i18next";
import { UserCircle } from "lucide-react";

export const CastList = ({casts}: { casts: Cast[] }) =>
	{
		const {t} = useTranslation();

		if (!casts || casts.length === 0) return null;

		return (
				<div className="mt-8 pt-8 border-t border-border w-full overflow-hidden">
					<h3 className="text-xl font-bold text-foreground mb-4">
						{t("movieDetails.topBilledCast")}
					</h3>
					<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
						{casts.map((actor) => (
								<div
										key={actor.id}
										className="min-w-35 w-35 shrink-0 bg-card rounded-lg overflow-hidden border border-border shadow-sm transition-transform hover:bg-accent text-card-foreground cursor-pointer"
								>
									{actor.profile_path ? (
											<img
													src={`https://image.tmdb.org/t/p/w276_and_h350_face${actor.profile_path}`}
													alt={actor.name}
													className="w-full h-43.75 object-cover pointer-events-none"
													draggable={false}
											/>
									) : (
											<div className="w-full h-43.75 bg-muted flex items-center justify-center">
												<UserCircle className="w-12 h-12 text-muted-foreground"/>
											</div>
									)}
									<div className="p-3 pointer-events-none">
										<p className="font-bold text-[15px] leading-tight mb-1 truncate">{actor.name}</p>
										<p className="text-xs text-muted-foreground leading-snug truncate">{actor.character}</p>
									</div>
								</div>
						))}
					</div>
				</div>
		);
	};