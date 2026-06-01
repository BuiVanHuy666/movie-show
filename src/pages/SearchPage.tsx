import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/search/SideBar.tsx";
import { SearchBar } from "@/components/search/SearchBar.tsx";
import { SearchSkeleton } from "@/components/search/SearchSkeleton.tsx";
import { ResultItem, type SearchItemData } from "@/components/search/ResultItems.tsx";
import { SearchPagination } from "@/components/search/SearchPagination.tsx";
import type { SearchType } from "@/types/common.ts";
import { SearchService } from "@/services/searchService.ts";

export const SearchPage = () => {
	const { t, i18n } = useTranslation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const query = searchParams.get("query") || "";
	const [prevQuery, setPrevQuery] = useState(query);

	const [inputValue, setInputValue] = useState(query);

	const [activeTab, setActiveTab] = useState<SearchType>("movie");
	const [page, setPage] = useState(1);

	const [results, setResults] = useState<SearchItemData[]>([]);

	const [totalPages, setTotalPages] = useState(1);
	const [counts, setCounts] = useState({ movie: 0, tv: 0, person: 0 });
	const [isLoading, setIsLoading] = useState(false);

	const lastFetchedQuery = useRef("");
	const lastFetchedLang = useRef("");

	if (query !== prevQuery) {
		setPrevQuery(query);
		setInputValue(query);
	}

	useEffect(() => {
		if (!query) return;

		const fetchSearchResults = async () => {
			setIsLoading(true);
			try {
				const currentLang = i18n.language;

				// 1. Gọi API bằng Service, code cực sạch
				const activeRes = await SearchService.searchByType<SearchItemData>(activeTab, query, page);

				setResults(activeRes.results || []);
				setTotalPages(activeRes.total_pages || 1);

				// 2. Chỉ tính toán lại tab counts nếu query hoặc ngôn ngữ đổi
				if (query !== lastFetchedQuery.current || currentLang !== lastFetchedLang.current) {
					const types: SearchType[] = ["movie", "tv", "person"];

					const countPromises = types.map(type => {
						if (type === activeTab) return Promise.resolve(activeRes.total_results);

						return SearchService.searchByType<SearchItemData>(type, query, 1)
								.then(res => res.total_results || 0);
					});

					const [movieCount, tvCount, personCount] = await Promise.all(countPromises);
					setCounts({ movie: movieCount, tv: tvCount, person: personCount });

					lastFetchedQuery.current = query;
					lastFetchedLang.current = currentLang;
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

	return (
			<div className="min-h-screen bg-background text-foreground pb-12">
				<SearchBar inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleSearchSubmit} />

				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row gap-8 items-start">

						<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} setPage={setPage} />

						<div className="flex-1 w-full min-w-0">
							{isLoading ? (
									<SearchSkeleton />
							) : results.length === 0 ? (
									<div className="text-center py-20 text-muted-foreground text-lg">
										{t("movieDetails.noInfo")}
									</div>
							) : (
									<div className="space-y-4">
										{results.map((item) => (
												<ResultItem key={item.id} item={item} activeTab={activeTab} />
										))}

										<SearchPagination page={page} setPage={setPage} totalPages={totalPages} />
									</div>
							)}
						</div>

					</div>
				</div>
			</div>
	);
};