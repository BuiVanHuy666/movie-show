import { useNavigate } from "react-router-dom";
import { PATHS } from "@/app/routes/routes"; // Đảm bảo import đúng đường dẫn PATHS của bạn
import { Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card.tsx";

// --- TYPES ---
export interface MediaItem {
	id: number;
	title?: string;         // Dành cho Movie
	name?: string;          // Dành cho TV Show
	poster_path: string | null;
	release_date?: string;  // Dành cho Movie
	first_air_date?: string;// Dành cho TV Show
	vote_average: number;
}

interface MediaGridProps {
	items: MediaItem[];
	type: "movie" | "tv";
}

export const MediaGrid = ({ items, type }: MediaGridProps) => {
	const navigate = useNavigate();

	const handleNavigate = (id: number) => {
		if (type === "tv") {
			navigate(PATHS.TV.DETAIL(id));
		} else {
			navigate(PATHS.MOVIES.DETAIL(id));
		}
	};

	const formatDate = (dateString?: string) => {
		if (!dateString) return "";
		try {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat('en-US', {
				month: 'short', day: 'numeric', year: 'numeric'
			}).format(date);
		} catch (e) {
			return dateString;
		}
	};

	return (
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8 pt-2">
				{items.map((item) => {
					const title = item.title || item.name;
					const date = item.release_date || item.first_air_date;

					return (
							<Card
									key={item.id}
									className="relative flex flex-col group cursor-pointer p-0 pb-2"
									onClick={() => handleNavigate(item.id)}
							>
								<div className="relative w-full aspect-2/3 overflow-hidden bg-muted">
									{item.poster_path ? (
											<img
													src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
													alt={title}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													loading="lazy"
											/>
									) : (
											<div className="w-full h-full flex items-center justify-center">
												<ImageIcon className="w-12 h-12 text-muted-foreground/30" />
											</div>
									)}

									<div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>

								<div className="px-3 flex flex-col">
									<h3 className="font-bold text-[15px] leading-tight text-foreground group-hover:text-sky-500 transition-colors line-clamp-2">
										{title}
									</h3>
									<p className="text-muted-foreground text-[13px] mt-1 font-medium">
										{formatDate(date)}
									</p>
								</div>
							</Card>
					);
				})}
			</div>
	);
};