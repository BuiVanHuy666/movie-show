import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { TvShow } from "@/types/tvShow.ts";
import { MediaGrid } from "@/components/common/media/MediaGrid.tsx";
import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { TVService } from "@/services/mediaService.ts";
import { type FilterOptions, SearchService } from "@/services/searchService.ts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";

export const TvShowCategoryPage = ({ type }: { type: string }) => {
	const [tvShows, setTVShows] = useState<TvShow[]>([]);
	const [filters, setFilters] = useState<FilterOptions | null>(null);
	const { t, i18n } = useTranslation();

	const pageTitle = useMemo(() => {
		switch (type) {
			case "popular": return t("categories.popularTv");
			case "on_the_air": return t("categories.onTheAirTv");
			case "top_rated": return t("categories.topRatedTv");
			default: return t("categories.tvList");
		}
	}, [type, t]);

	useDocumentTitle(pageTitle);

	useEffect(() => {
		const fetchTVShows = async () => {
			try {
				if (filters) {
					const data = await SearchService.discoverTVShows(filters);
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