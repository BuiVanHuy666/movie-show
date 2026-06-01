import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon, User as UserIcon } from "lucide-react";
import { PATHS } from "@/app/routes/routes.ts";
import type { SearchType } from "@/types/common.ts";

export interface SearchItemData {
	id: number;
	title?: string;
	name?: string;
	release_date?: string;
	first_air_date?: string;
	profile_path?: string | null;
	poster_path?: string | null;
	overview?: string;
	known_for_department?: string;
	known_for?: SearchItemData[];
}

interface SearchResultItemProps {
	item: SearchItemData;
	activeTab: SearchType;
}

export const ResultItem = ({ item, activeTab }: SearchResultItemProps) => {
	const isPerson = activeTab === "person";
	const title = item.title || item.name;
	const date = item.release_date || item.first_air_date;
	const imagePath = isPerson ? item.profile_path : item.poster_path;
	const imageUrl = imagePath ? `https://image.tmdb.org/t/p/w200${imagePath}` : null;

	const knownFor = isPerson && item.known_for
			? item.known_for.map((k) => k.title || k.name).join(", ")
			: "";

	const detailUrl =
			activeTab === "movie" ? PATHS.MOVIES.DETAIL(item.id) :
					activeTab === "tv" ? PATHS.TV.DETAIL(item.id) :
							PATHS.ACTORS.DETAIL(item.id);

	return (
			<Card className="flex flex-row overflow-hidden hover:shadow-md hover:border-sky-500/50 transition-all duration-300 border-border group">
				<Link to={detailUrl} className="w-22.5 h-33.75 shrink-0 bg-muted flex items-center justify-center overflow-hidden">
					{imageUrl ? (
							<img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
					) : (
							isPerson ? <UserIcon className="w-8 h-8 text-muted-foreground/50" /> : <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
					)}
				</Link>

				<div className="flex-1 p-4 flex flex-col justify-center min-w-0">
					<Link to={detailUrl} className="w-fit">
						<h3 className="font-bold text-lg cursor-pointer transition-colors truncate group-hover:text-sky-500">
							{title}
						</h3>
					</Link>

					{isPerson ? (
							<div className="text-sm mt-1">
								<span className="font-medium mr-1 text-foreground">{item.known_for_department} •</span>
								<span className="text-muted-foreground line-clamp-1">{knownFor}</span>
							</div>
					) : (
							<>
								<div className="text-sm text-muted-foreground mb-2">{date}</div>
								<p className="text-sm text-foreground/80 line-clamp-2">{item.overview}</p>
							</>
					)}
				</div>
			</Card>
	);
};