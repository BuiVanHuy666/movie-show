import { useEffect, useState, useMemo } from "react";
import type { Movie } from "@/types/movie.ts";
import { MediaGrid } from "@/components/common/media/MediaGrid.tsx";
import { useTranslation } from "react-i18next";
import { MovieService } from "@/services/mediaService.ts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";
import { Loader2 } from "lucide-react";
import { CustomPagination } from "@/components/common/CustomPagination.tsx";
import { Skeleton } from "@/components/ui/skeleton"; // Import thêm thẻ Skeleton

export const MovieCategoryPage = ({ type }: { type: string }) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const [prevType, setPrevType] = useState(type);

	const { t, i18n } = useTranslation();

	if (type !== prevType) {
		setPrevType(type);
		setCurrentPage(1);
	}

	const pageTitle = useMemo(() => {
		switch (type) {
			case "popular":
				return t("categories.popularMovies");
			case "now_playing":
				return t("categories.nowPlayingMovies");
			case "upcoming":
				return t("categories.upcomingMovies");
			case "top_rated":
				return t("categories.topRatedMovies");
			default:
				return t("categories.movieList");
		}
	}, [type, t]);

	useDocumentTitle(pageTitle);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
			try {
				const data = await MovieService.getMovieByType(type, currentPage);
				setMovies(data.results);
				setTotalPages(Math.min(data.total_pages || 1, 500));
			} catch (error) {
				console.error("Failed to fetch movies:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMovies();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}, [i18n.language, type, currentPage]);

	const renderSkeletons = () => (
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8 pt-2">
				{Array.from({ length: 20 }).map((_, i) => (
						<div key={i} className="flex flex-col">
							<Skeleton className="w-full aspect-2/3 rounded-xl mb-3" />

							<div className="px-3 flex flex-col gap-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-3 w-2/3" />
							</div>
						</div>
				))}
			</div>
	);

	return (
			<div className="container mx-auto px-4 py-8 flex flex-col gap-8 w-full max-w-7xl">
				<div className="flex items-center justify-between border-b border-border pb-4">
					<h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
						{pageTitle}
						{isLoading && (
								<Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
						)}
					</h1>
				</div>

				<div className="w-full min-w-0 min-h-[50vh]">
					{isLoading ? (
							renderSkeletons()
					) : movies.length === 0 ? (
							<div className="flex items-center justify-center h-40">
								<p className="text-muted-foreground text-lg">{t("movieDetails.noInfo")}</p>
							</div>
					) : (
							<MediaGrid items={movies} type="movie" />
					)}
				</div>

				{!isLoading && (
						<CustomPagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
						/>
				)}
			</div>
	);
};