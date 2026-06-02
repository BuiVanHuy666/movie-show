import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { TvShow } from "@/types/tvShow.ts";
import { MediaGrid } from "@/components/common/media/MediaGrid.tsx";
import { TVService } from "@/services/mediaService.ts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";
import { Loader2 } from "lucide-react";
import { CustomPagination } from "@/components/common/CustomPagination.tsx";
import { Skeleton } from "@/components/ui/skeleton";

export const TvShowCategoryPage = ({type}: { type: string }) => {
	const [tvShows, setTVShows] = useState<TvShow[]>([]);
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
				return t("categories.popularTv");
			case "on_the_air":
				return t("categories.onTheAirTv");
			case "top_rated":
				return t("categories.topRatedTv");
			default:
				return t("categories.tvList");
		}
	}, [type, t]);

	useDocumentTitle(pageTitle);

	useEffect(() => {
		const fetchTVShows = async () => {
			setIsLoading(true);
			try {
				const data = await TVService.getTVShowsByType(type, currentPage);
				setTVShows(data.results);
				setTotalPages(Math.min(data.total_pages || 1, 500));
			} catch (error) {
				console.error("Failed to fetch TV shows:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTVShows();

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
						{isLoading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
					</h1>
				</div>

				<div className="w-full min-w-0 min-h-[50vh]">
					{/* Cập nhật luồng render tương tự như trang Movie */}
					{isLoading ? (
							renderSkeletons()
					) : tvShows.length === 0 ? (
							<div className="flex items-center justify-center h-40">
								<p className="text-muted-foreground text-lg">{t("movieDetails.noInfo")}</p>
							</div>
					) : (
							<MediaGrid items={tvShows} type="tv" />
					)}
				</div>

				{!isLoading && (
						<CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
				)}
			</div>
	);
};