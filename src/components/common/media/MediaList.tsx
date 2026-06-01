import { Image as ImageIcon, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS } from "@/app/routes/routes.ts";
import type { Movie } from "@/types/movie.ts";
import type { TvShow } from "@/types/tvShow.ts";

type MediaData = Movie | TvShow;

interface MediaScrollerProps {
	title: string;
	data: MediaData[];
	mediaType: "movie" | "tv";
}

export const MediaList = ({ title, data, mediaType }: MediaScrollerProps) => {
	if (!data || data.length === 0) return null;

	const FallbackIcon = mediaType === "movie" ? ImageIcon : Tv;

	return (
			<div className="space-y-4 pt-4 border-t border-border mt-8">
				<h3 className="font-bold text-xl">{title}</h3>
				<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
					{data.map((item) => {
						const itemTitle = 'title' in item ? item.title : item.name;

						const detailUrl = mediaType === "movie"
								? PATHS.MOVIES.DETAIL(item.id)
								: PATHS.TV.DETAIL(item.id);

						return (
								<Link
										key={item.id}
										to={detailUrl}
										className="w-56 shrink-0 cursor-pointer group block"
								>
									<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-video bg-muted relative">
										{item.backdrop_path ? (
												<img
														src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
														alt={itemTitle}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
														draggable={false}
												/>
										) : (
												<div className="w-full h-full flex items-center justify-center">
													<FallbackIcon className="w-8 h-8 text-muted-foreground/50" />
												</div>
										)}
									</div>
									<p className="text-sm font-bold truncate transition-colors group-hover:text-sky-500">
										{itemTitle}
									</p>
								</Link>
						);
					})}
				</div>
			</div>
	);
};