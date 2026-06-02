import { Moon, Sun, Search, TrendingUp, Loader2, Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState, useEffect, useRef } from "react"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx"
import { useTheme } from "@/app/providers/theme-provider.tsx"
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/app/routes/routes.ts";
import { useTrendingKeywords } from "@/hooks/useTrendingKeywords.ts";

export const Header = () => {
	const { theme, setTheme } = useTheme()
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	const [searchKey, setSearchKey] = useState("")
	const [showTrending, setShowTrending] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const searchContainerRef = useRef<HTMLDivElement>(null)

	const {
		keywords: trendingList,
		isLoading: isLoadingTrending
	} = useTrendingKeywords("day", 10);

	const toggleLanguage = async () => {
		const newLang = i18n.language === "vi" ? "en" : "vi";
		await i18n.changeLanguage(newLang);
	};

	const handleInputFocus = () => {
		setShowTrending(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
				setShowTrending(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchKey.trim()) {
			setShowTrending(false);
			navigate(PATHS.SEARCH(searchKey.trim()));
		}
	};

	const handleSelectTrendingItem = (keyword: string) => {
		setSearchKey(keyword);
		setShowTrending(false);
		navigate(PATHS.SEARCH(keyword.trim()));
	};

	return (
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container mx-auto px-4 py-3 min-h-16 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-3 gap-x-4">
					<div className="flex items-center gap-2 shrink-0 order-1">
						<button
								className="lg:hidden p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-label="Toggle Menu"
						>
							{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>

						<Link to={PATHS.HOME} className="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
							MovieShow
						</Link>
					</div>

					<div
							ref={searchContainerRef}
							className="relative w-full order-3 lg:order-2 lg:w-auto lg:grow max-w-xl mx-0 lg:mx-4"
					>
						<form onSubmit={handleSearchSubmit} className="relative w-full">
							<input
									type="text"
									placeholder={i18n.language === "vi" ? "Tìm kiếm phim, tv show..." : "Search for a movie, tv show..."}
									value={searchKey}
									onChange={(e) => setSearchKey(e.target.value)}
									onFocus={handleInputFocus}
									className="w-full h-10 pl-10 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 border border-border rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-foreground"
							/>
							<button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
								<Search className="w-5 h-5" />
							</button>
						</form>

						{showTrending && (
								<div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-950 border border-border rounded-md shadow-2xl overflow-hidden z-50">
									<div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-border">
										<TrendingUp className="w-5 h-5 text-foreground font-bold" />
										<span className="font-bold text-base text-foreground tracking-wide">Trending</span>
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
																		className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-800 dark:text-zinc-200 border-b border-border/50 last:border-none"
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

					<NavigationMenu className="hidden lg:flex lg:order-3">
						<NavigationMenuList className="gap-2">
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent">{t('nav.movies')}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-55 gap-1 p-3">
										<Link to={PATHS.MOVIES.POPULAR}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.popular')}</NavigationMenuLink></Link>
										<Link to={PATHS.MOVIES.NOW_PLAYING}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.nowPlaying')}</NavigationMenuLink></Link>
										<Link to={PATHS.MOVIES.UP_COMING}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.upcoming')}</NavigationMenuLink></Link>
										<Link to={PATHS.MOVIES.TOP_RATED}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.topRated')}</NavigationMenuLink></Link>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent">{t('nav.tvShows')}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-55 gap-1 p-3">
										<Link to={PATHS.TV.POPULAR}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.popular')}</NavigationMenuLink></Link>
										<Link to={PATHS.TV.ON_THE_AIR}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.onTheAir')}</NavigationMenuLink></Link>
										<Link to={PATHS.TV.TOP_RATED}><NavigationMenuLink className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.topRated')}</NavigationMenuLink></Link>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink href={PATHS.ACTORS.POPULAR} className={navigationMenuTriggerStyle()}>
									{t('nav.actors')}
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					<div className="flex items-center gap-2 md:gap-4 shrink-0 order-2 lg:order-4">
						<button
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
						>
							{theme === "dark" ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
						</button>

						<button
								onClick={toggleLanguage}
								className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm font-bold transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
						>
							{i18n.language === "vi" ? "VI" : "EN"}
						</button>
					</div>

					{isMobileMenuOpen && (
							<div className="w-full order-5 lg:hidden flex flex-col gap-4 mt-2 pt-4 pb-2 border-t border-border animate-in slide-in-from-top-2">
								<div className="flex flex-col gap-1">
									<span className="font-bold text-xs text-muted-foreground uppercase px-2 mb-1">{t('nav.movies')}</span>
									<Link to={PATHS.MOVIES.POPULAR} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.popular')}</Link>
									<Link to={PATHS.MOVIES.NOW_PLAYING} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.nowPlaying')}</Link>
									<Link to={PATHS.MOVIES.UP_COMING} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.upcoming')}</Link>
									<Link to={PATHS.MOVIES.TOP_RATED} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.topRated')}</Link>
								</div>

								<div className="flex flex-col gap-1">
									<span className="font-bold text-xs text-muted-foreground uppercase px-2 mb-1">{t('nav.tvShows')}</span>
									<Link to={PATHS.TV.POPULAR} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.popular')}</Link>
									<Link to={PATHS.TV.ON_THE_AIR} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.onTheAir')}</Link>
									<Link to={PATHS.TV.TOP_RATED} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">{t('menu.topRated')}</Link>
								</div>

								<div className="flex flex-col gap-1 border-t border-border/50 pt-2">
									<Link to={PATHS.ACTORS.POPULAR} onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-sm px-2 py-2 hover:text-indigo-500 transition-colors">
										{t('nav.actors')}
									</Link>
								</div>
							</div>
					)}
				</div>
			</header>
	)
}