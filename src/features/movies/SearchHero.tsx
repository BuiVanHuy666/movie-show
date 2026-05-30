import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/app/routes/routes.ts";
import { MovieService, SearchService } from "@/services/mediaService.ts";

export const SearchHero = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const [backgroundImage, setBackgroundImage] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState("");

	const [showTrendingKeyWords, setShowTrendingKeyWords] = useState(false);
	const [trendingList, setTrendingList] = useState<string[]>([]);
	const [isLoadingTrending, setIsLoadingTrending] = useState(false);

	const searchContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchRandomBackdrop = async () => {
			try {
				const data = await MovieService.getNowPlaying();
				const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

				if (randomMovie.backdrop_path) {
					setBackgroundImage(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
				}
			} catch (error) {
				console.error("Lỗi lấy ảnh nền:", error);
			}
		};
		fetchRandomBackdrop();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
				setShowTrendingKeyWords(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const fetchTrendingSearches = async () => {
		setIsLoadingTrending(true);
		try {
			const data = await SearchService.getTrendingKeywords();
			if (data && data.results) {
				const parsedResults = data.results
						.slice(0, 10)
						.map((item: any) => item.title || item.name)
						.filter(Boolean);
				setTrendingList(parsedResults);
			}
		} catch (error) {
			console.error("Lỗi khi lấy dữ liệu trending search:", error);
		} finally {
			setIsLoadingTrending(false);
		}
	};

	const handleInputFocus = () => {
		setShowTrendingKeyWords(true);
		if (trendingList.length === 0) {
			fetchTrendingSearches();
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			console.log("Đang tìm kiếm:", searchQuery);
			setShowTrendingKeyWords(false);
			navigate(PATHS.SEARCH(searchQuery.trim()));
		}
	};

	const handleSelectTrendingItem = (keyword: string) => {
		setSearchQuery(keyword);
		setShowTrendingKeyWords(false);
	};

	return (
			<div className="relative w-full h-75 md:h-90 flex items-center bg-sky-600">
				{backgroundImage && (
						<>
							<img
									src={backgroundImage}
									alt="Hero Background"
									className="absolute inset-0 w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-sky-900/70 mix-blend-multiply" />
							<div className="absolute inset-0 bg-linear-to-r from-sky-800/90 to-sky-600/40" />
						</>
				)}

				<div className="relative z-10 w-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
					<div className="text-white mb-10">
						<h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
							{t("home.welcome")}
						</h1>
						<h2 className="text-2xl md:text-3xl font-semibold">
							{t("home.exploreText")}
						</h2>
					</div>

					{/* Search Container (Gồm Input & Dropdown) */}
					<div ref={searchContainerRef} className="relative w-full">
						<form onSubmit={handleSearch} className="relative w-full">
							<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={handleInputFocus}
									placeholder={t("nav.search.placeholder")}
									className="w-full h-12 md:h-14 bg-white rounded-full pl-6 pr-32 text-base md:text-lg text-zinc-900 outline-none shadow-lg placeholder:text-zinc-500 transition-all"
							/>
							<button
									type="submit"
									className="absolute right-0 top-0 h-12 md:h-14 px-6 md:px-8 rounded-full bg-linear-to-r from-teal-400 to-cyan-500 text-white font-bold text-base hover:text-zinc-900 transition-colors shadow-md"
							>
								{t("nav.search.button")}
							</button>
						</form>

						{showTrendingKeyWords && (
								<div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
									<div className="flex items-center gap-2 px-6 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
										<TrendingUp className="w-5 h-5 text-sky-500" />
										<span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 tracking-wide">
                                    {i18n.language === 'vi' ? 'Tìm kiếm thịnh hành' : 'Trending Searches'}
                                </span>
									</div>

									{isLoadingTrending ? (
											<div className="flex items-center justify-center p-6">
												<Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
											</div>
									) : (
											<ul className="max-h-75 overflow-y-auto py-2 custom-scrollbar">
												{trendingList.length > 0 ? (
														trendingList.map((item, index) => (
																<li
																		key={index}
																		onClick={() => handleSelectTrendingItem(item)}
																		className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-800 dark:text-zinc-200"
																>
																	<Search className="w-5 h-5 text-zinc-400 shrink-0" />
																	<span className="text-base truncate font-medium">{item}</span>
																</li>
														))
												) : (
														<li className="px-6 py-4 text-base text-zinc-500 text-center">
															{t("movieDetails.noInfo")}
														</li>
												)}
											</ul>
									)}
								</div>
						)}
					</div>
				</div>
			</div>
	);
};