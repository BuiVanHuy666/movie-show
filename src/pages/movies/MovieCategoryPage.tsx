import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie.ts";
import { MediaGrid } from "@/components/common/MediaGrid.tsx";
import { useTranslation } from "react-i18next";
import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { MovieService } from "@/services/mediaService.ts";

export const MovieCategoryPage = ({ type }: { type: string }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const { i18n } = useTranslation();

	useEffect(() => {
		const fetchPopularMovies = async () => 	{
			const data = await MovieService.getMovieByType(type);
			setMovies(data.results);
		};
		fetchPopularMovies();
	}, [i18n.language, type])

	return (
			<>
				<SideBarFilter type={type}/>
				<div className="flex-1 w-full min-w-0">
					<MediaGrid items={movies} type="movie" />
				</div>
			</>
	);
};