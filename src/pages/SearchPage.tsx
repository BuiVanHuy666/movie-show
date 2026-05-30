import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Pagination,
	PaginationContent, PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Info, Image as ImageIcon, User as UserIcon } from "lucide-react";
import { PATHS } from "@/app/routes/routes";

type SearchType = "movie" | "tv" | "person";

export const SearchPage = () => {
	const { t, i18n } = useTranslation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const query = searchParams.get("query") || "";
	const [inputValue, setInputValue] = useState(query);
	const [activeTab, setActiveTab] = useState<SearchType>("movie");
	const [page, setPage] = useState(1);

	const [results, setResults] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [counts, setCounts] = useState({ movie: 0, tv: 0, person: 0 });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setInputValue(query);
	}, [query]);

	useEffect(() => {
		if (!query) return;

		const fetchSearchResults = async () => {
			setIsLoading(true);
			try {
				const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
				const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
				const lang = i18n.language === "vi" ? "vi-VN" : "en-US";

				const activeRes = await fetch(
						`${BASE_URL}/search/${activeTab}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=${lang}&include_adult=false`
				).then(res => res.json());

				setResults(activeRes.results || []);
				setTotalPages(activeRes.total_pages || 1);

				if (page === 1) {
					const types: SearchType[] = ["movie", "tv", "person"];
					const countPromises = types.map(type => {
						if (type === activeTab) return Promise.resolve(activeRes.total_results);
						return fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1&language=${lang}&include_adult=false`)
								.then(res => res.json())
								.then(data => data.total_results || 0);
					});

					const [movieCount, tvCount, personCount] = await Promise.all(countPromises);
					setCounts({ movie: movieCount, tv: tvCount, person: personCount });
				}
			} catch (error) {
				console.error("Lỗi fetch dữ liệu tìm kiếm:", error);
			} finally {
				setTimeout(() => setIsLoading(false), 300);
			}
		};

		fetchSearchResults();
	}, [query, activeTab, page, i18n.language]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			setPage(1);
			navigate(`/movie-show/search?query=${encodeURIComponent(inputValue.trim())}`);
		}
	};

	const categories: { key: SearchType; label: string; count: number }[] = [
		{ key: "movie", label: "search.sidebar.movie", count: counts.movie },
		{ key: "tv", label: "search.sidebar.tv", count: counts.tv },
		{ key: "person", label: "search.sidebar.person", count: counts.person },
	];

	const SearchSkeleton = () => (
			<div className="space-y-4">
				{[1, 2, 3, 4, 5].map((i) => (
						<Card key={i} className="flex flex-row overflow-hidden border-border h-[135px]">
							<Skeleton className="w-[90px] h-full rounded-none shrink-0" />
							<div className="flex-1 p-4 flex flex-col justify-center gap-3">
								<Skeleton className="h-6 w-2/4" />
								<Skeleton className="h-4 w-1/4" />
								<div className="space-y-2 mt-2">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-3 w-5/6" />
								</div>
							</div>
						</Card>
				))}
			</div>
	);

	return (
			<div className="min-h-screen bg-background text-foreground pb-12">
				<div className="border-b bg-card sticky top-[64px] z-40 shadow-sm">
					<div className="container mx-auto px-4 py-2">
						<form onSubmit={handleSearchSubmit} className="relative max-w-5xl mx-auto flex items-center">
							<Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
							<Input
									className="pl-11 h-12 rounded-full border-muted bg-muted/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-sky-500 text-base"
									placeholder={t("nav.search.placeholder")}
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
							/>
						</form>
					</div>
				</div>

				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row gap-8 items-start">

						<div className="w-full md:w-64 shrink-0 flex flex-col gap-4 sticky top-37.5">
							<Card className="rounded-xl overflow-hidden border-border shadow-sm p-0">
								<div className="bg-sky-500 p-4 text-white font-bold text-lg">
									{t("search.title")}
								</div>
								<div className="flex flex-col p-2 gap-1">
									{categories.map((cat) => (
											<Button
													key={cat.key}
													variant={activeTab === cat.key ? "secondary" : "ghost"}
													className={`w-full justify-between px-4 py-6 font-normal ${
															activeTab === cat.key ? "font-bold bg-accent" : "hover:bg-muted/50"
													}`}
													onClick={() => {
														setActiveTab(cat.key);
														setPage(1);
													}}
											>
												<span className="text-base">{t(cat.label)}</span>
												<Badge variant={activeTab === cat.key ? "default" : "secondary"} className="ml-auto rounded-full px-2.5">
													{cat.count.toLocaleString()}
												</Badge>
											</Button>
									))}
								</div>
							</Card>

							<div className="flex items-start gap-2 px-2 text-muted-foreground text-sm leading-relaxed italic">
								<Info className="w-4 h-4 shrink-0 mt-0.5" />
								<p>{t("search.sidebar.hint")}</p>
							</div>
						</div>

						<div className="flex-1 w-full min-w-0">
							{isLoading ? (
									<SearchSkeleton />
							) : results.length === 0 ? (
									<div className="text-center py-20 text-muted-foreground text-lg">
										{t("movieDetails.noInfo")}
									</div>
							) : (
									<div className="space-y-4">
										{results.map((item) => {
											const isPerson = activeTab === "person";
											const title = item.title || item.name;
											const date = item.release_date || item.first_air_date;
											const imagePath = isPerson ? item.profile_path : item.poster_path;
											const imageUrl = imagePath ? `https://image.tmdb.org/t/p/w200${imagePath}` : null;

											const knownFor = isPerson && item.known_for
													? item.known_for.map((k: any) => k.title || k.name).join(", ")
													: "";

											const detailUrl =
													activeTab === "movie" ? PATHS.MOVIES.DETAIL(item.id) :
															activeTab === "tv" ? PATHS.TV.DETAIL(item.id) :
																	PATHS.ACTORS.DETAIL(item.id);

											return (
													<Card key={item.id} className="flex flex-row overflow-hidden hover:shadow-md hover:border-sky-500/50 transition-all duration-300 border-border group">
														{/* Bọc Link cho Poster */}
														<Link to={detailUrl} className="w-22.5 h-33.75 shrink-0 bg-muted flex items-center justify-center overflow-hidden block">
															{imageUrl ? (
																	<img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
															) : (
																	isPerson ? <UserIcon className="w-8 h-8 text-muted-foreground/50" /> : <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
															)}
														</Link>

														<div className="flex-1 p-4 flex flex-col justify-center min-w-0">
															{/* Bọc Link cho Tiêu đề */}
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
										})}

										{totalPages > 1 && (
												<Pagination className="pt-8 pb-4">
													<PaginationContent>
														<PaginationItem>
															<PaginationPrevious
																	text={t("pagination.previous")}
																	onClick={() => setPage(p => Math.max(1, p - 1))}
																	className={page === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"}
															/>
														</PaginationItem>

														{(() => {
															const items = [];
															let startPage = Math.max(1, page - 1);
															let endPage = Math.min(totalPages, page + 1);

															if (page === 1) endPage = Math.min(totalPages, 3);
															if (page === totalPages) startPage = Math.max(1, totalPages - 2);

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
																	onClick={() => setPage(p => Math.min(totalPages, p + 1))}
																	className={page >= totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"}
															/>
														</PaginationItem>
													</PaginationContent>
												</Pagination>
										)}
									</div>
							)}
						</div>

					</div>
				</div>
			</div>
	);
};