import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATHS } from "@/app/routes/routes.ts";

interface KnownForMedia {
	id: number;
	credit_id: string;
	poster_path: string | null;
	title?: string;
	name?: string;
	media_type?: string;
}

export const KnownFor = ({ items }: { items: KnownForMedia[] }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	if (!items || items.length === 0) return null;

	return (
			<div className="space-y-4 overflow-hidden mt-2">
				<h3 className="font-bold text-xl">{t("actorDetails.knownFor", "Known For")}</h3>
				<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
					{items.map(media => {
						const title = media.title || media.name;
						return (
								<div key={media.credit_id} className="w-32.5 shrink-0 cursor-pointer group" onClick={() => navigate(media.media_type === "tv" ? PATHS.TV.DETAIL(media.id) : PATHS.MOVIES.DETAIL(media.id))}>
									<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-2/3 bg-muted">
										<img src={`https://image.tmdb.org/t/p/w200${media.poster_path}`} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none" draggable={false} />
									</div>
									<p className="text-sm font-semibold truncate group-hover:text-sky-500 text-center">{title}</p>
								</div>
						);
					})}
				</div>
			</div>
	);
};