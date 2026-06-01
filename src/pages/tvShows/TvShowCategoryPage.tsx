import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TvShow } from "@/types/tvShow.ts";
import { MediaGrid } from "@/components/common/MediaGrid.tsx";
import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { TVService } from "@/services/mediaService.ts";
import { type FilterOptions, SearchService } from "@/services/searchService.ts";

export const TvShowCategoryPage = ({ type }: { type: string }) => {
	const [tvShows, setTVShows] = useState<TvShow[]>([]);
	const [filters, setFilters] = useState<FilterOptions | null>(null);
	const { i18n } = useTranslation();

	useEffect(() => {
		const fetchTVShows = async () => {
			try {
				const lang = i18n.language === "vi" ? "vi-VN" : "en-US";
				if (filters) {
					const data = await SearchService.discoverTVShows(filters, lang);
					setTVShows(data.results);
				} else {
					const data = await TVService.getTVShowsByType(type);
					setTVShows(data.results);
				}
			} catch (error) {
				console.error("Failed to fetch TV shows:", error);
			}
		};
		fetchTVShows();
	}, [i18n.language, type, filters]);

	const handleFilterChange = (newFilters: FilterOptions) => {
		setFilters(newFilters);
	};

	return (
			<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start gap-8">
				<SideBarFilter type="tv" onFilter={handleFilterChange} />
				<div className="flex-1 w-full min-w-0">
					<MediaGrid items={tvShows} type="tv" />
				</div>
			</div>
	);
};