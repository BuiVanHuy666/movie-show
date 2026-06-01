import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie.ts";
import { MediaGrid } from "@/components/common/MediaGrid.tsx";
import { useTranslation } from "react-i18next";
import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { MovieService } from "@/services/mediaService.ts";
import { type FilterOptions, SearchService } from "@/services/searchService.ts";

export const MovieCategoryPage = ({ type }: { type: string }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [filters, setFilters] = useState<FilterOptions | null>(null);
	const { i18n } = useTranslation();

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				if (filters) {
					const data = await SearchService.discoverMovies(filters);
					setMovies(data.results);
				} else {
					const data = await MovieService.getMovieByType(type);
					setMovies(data.results);
				}
			} catch (error) {
				console.error("Failed to fetch movies:", error);
			}
		};
		fetchMovies();
	}, [i18n.language, type, filters]);

	const handleFilterChange = (newFilters: FilterOptions) => {
		console.log(newFilters)
		setFilters(newFilters);
	};

	return (
			<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start gap-8">
				<SideBarFilter type="movie" onFilter={handleFilterChange} />
				<div className="flex-1 w-full min-w-0">
					<MediaGrid items={movies} type="movie" />
				</div>
			</div>
	);
};