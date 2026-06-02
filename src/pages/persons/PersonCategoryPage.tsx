import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User as UserIcon } from "lucide-react";
import { PATHS } from "@/app/routes/routes";
import { PersonService } from "@/services/mediaService.ts";
import type { PopularPerson } from "@/types/person.ts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";
import { CustomPagination } from "@/components/common/CustomPagination.tsx";

export const PersonCategoryPage = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	useDocumentTitle(t("popularPeople.title", "Popular People"));

	const [people, setPeople] = useState<PopularPerson[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const fetchPopularPeople = async () => {
			setIsLoading(true);
			try {
				const data = await PersonService.getPopular(page);
				if (isMounted && data) {
					setPeople(data.results);
					setTotalPages(Math.min(data.total_pages || 1, 500)); // Giới hạn 500 trang theo TMDB
				}
			} catch (error) {
				console.error("Failed to fetch popular people:", error);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		fetchPopularPeople();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		return () => {
			isMounted = false;
		};
	}, [page, i18n.language]);

	const renderSkeletons = () => (
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{Array.from({ length: 20 }).map((_, i) => (
						<div key={i} className="flex flex-col border border-border rounded-xl overflow-hidden shadow-sm">
							<Skeleton className="w-full aspect-3/4 rounded-none" />
							<div className="p-4 flex flex-col gap-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-2/3" />
							</div>
						</div>
				))}
			</div>
	);

	return (
			<div className="min-h-screen bg-background text-foreground py-8">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-extrabold tracking-tight mb-8">
						{t("popularPeople.title", "Popular People")}
					</h1>

					{isLoading ? (
							renderSkeletons()
					) : (
							<>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
									{people.map((person) => {
										const knownForText = person.known_for
												?.map((work) => work.title || work.name)
												.filter(Boolean)
												.join(", ");

										return (
												<Card
														key={person.id}
														onClick={() => navigate(PATHS.ACTORS.DETAIL(person.id))}
														className="p-0 overflow-hidden border-border hover:shadow-lg hover:border-sky-500/50 transition-all duration-300 cursor-pointer group flex flex-col"
												>
													<div className="w-full aspect-3/4 bg-muted relative overflow-hidden shrink-0">
														{person.profile_path ? (
																<img
																		src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
																		alt={person.name}
																		className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
																/>
														) : (
																<div className="w-full h-full flex items-center justify-center">
																	<UserIcon className="w-12 h-12 text-muted-foreground/50" />
																</div>
														)}
													</div>

													<div className="p-4 flex flex-col flex-1">
														<h3 className="font-bold text-base text-foreground group-hover:text-sky-500 transition-colors line-clamp-1">
															{person.name}
														</h3>
														<p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
															{knownForText || t("movieDetails.noInfo", "Chưa cập nhật")}
														</p>
													</div>
												</Card>
										);
									})}
								</div>

								{!isLoading && (
										<CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
								)}
							</>
					)}
				</div>
			</div>
	);
};