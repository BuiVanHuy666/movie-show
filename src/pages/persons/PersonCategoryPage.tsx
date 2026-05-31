import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { User as UserIcon } from "lucide-react";
import { PATHS } from "@/app/routes/routes";
import { PersonService } from "@/services/mediaService.ts";
import type { PopularPerson } from "@/types/person.ts";

export const PersonCategoryPage = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

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
					setTotalPages(data.total_pages);
				}
			} catch (error) {
				console.error("Failed to fetch popular people:", error);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		fetchPopularPeople();

		return () => {
			isMounted = false;
		};
	}, [page, i18n.language]);

	const renderSkeletons = () => (
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{Array.from({ length: 20 }).map((_, i) => (
						<div key={i} className="flex flex-col gap-3">
							<Skeleton className="w-full aspect-3/4 rounded-xl" />
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
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

								{totalPages > 1 && (
										<Pagination className="pt-12 pb-8">
											<PaginationContent>
												<PaginationItem>
													<PaginationPrevious
															text={t("pagination.previous")}
															onClick={() => setPage((p) => Math.max(1, p - 1))}
															className={page === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"}
													/>
												</PaginationItem>

												{(() => {
													const items = [];
													let startPage = Math.max(1, page - 2);
													let endPage = Math.min(totalPages, page + 2);

													if (page <= 3) endPage = Math.min(totalPages, 5);
													if (page >= totalPages - 2) startPage = Math.max(1, totalPages - 4);

													for (let i = startPage; i <= endPage; i++) {
														items.push(
																<PaginationItem key={i}>
																	<PaginationLink
																			isActive={page === i}
																			onClick={() => setPage(i)}
																			className="cursor-pointer"
																	>
																		{i}
																	</PaginationLink>
																</PaginationItem>
														);
													}

													if (endPage < totalPages) {
														items.push(
																<PaginationItem key="ellipsis">
																	<PaginationEllipsis />
																</PaginationItem>
														);
													}

													return items;
												})()}

												<PaginationItem>
													<PaginationNext
															text={t("pagination.next")}
															onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
															className={page >= totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"}
													/>
												</PaginationItem>
											</PaginationContent>
										</Pagination>
								)}
							</>
					)}
				</div>
			</div>
	);
};