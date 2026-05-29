import { Moon, Sun, Search, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { getTrendingKeywords } from "@/services/movieApi.ts"
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
import { Link } from "react-router-dom";
import { PATHS } from "@/app/routes/routes.ts";

export const Header = () => {
    const { theme, setTheme } = useTheme()
    const { t, i18n } = useTranslation()
    const [searchKey, setSearchKey] = useState("")

    const [showTrending, setShowTrending] = useState(false)
    const [trendingList, setTrendingList] = useState<string[]>([])

    const searchContainerRef = useRef<HTMLDivElement>(null)

    const toggleLanguage = async () => {
        const newLang = i18n.language === "vi" ? "en" : "vi";
        await i18n.changeLanguage(newLang);
    };

    const fetchTrendingSearches = async () => {
        try {
            const data = await getTrendingKeywords();

            if (data && data.results) {
                const parsedResults = data.results
                        .slice(0, 10)
                        .map((item: any) => item.title || item.name)
                        .filter(Boolean);

                setTrendingList(parsedResults);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu trending search:", error);
        }
    };

    const handleInputFocus = () => {
        setShowTrending(true);
        if (trendingList.length === 0) {
            fetchTrendingSearches();
        }
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
        console.log("Đang tìm kiếm:", searchKey.trim());
        setShowTrending(false);
    };

    const handleSelectTrendingItem = (keyword: string) => {
        setSearchKey(keyword);
        console.log("Đã chọn gợi ý:", keyword);
        setShowTrending(false);
    };

    return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 mx-auto gap-4">

                    <div className="flex items-center gap-2 shrink-0">
                    <Link to={PATHS.HOME} className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                        MovieShow
                    </Link>
                    </div>

                    <div ref={searchContainerRef} className="relative grow max-w-xl mx-4">
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <input
                                    type="text"
                                    placeholder={i18n.language === "vi" ? "Tìm kiếm phim, tv show, diễn viên..." : "Search for a movie, tv show, person..."}
                                    value={searchKey}
                                    onChange={(e) => setSearchKey(e.target.value)}
                                    onFocus={handleInputFocus}
                                    className="w-full h-10 pl-10 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 border border-border rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-foreground"
                            />
                            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        {showTrending && trendingList.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-950 border border-border rounded-md shadow-2xl overflow-hidden z-50">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-border">
                                        <TrendingUp className="w-5 h-5 text-foreground font-bold" />
                                        <span className="font-bold text-base text-foreground tracking-wide">Trending</span>
                                    </div>

                                    <ul className="max-h-[60vh] overflow-y-auto">
                                        {trendingList.map((item, index) => (
                                                <li
                                                        key={index}
                                                        onClick={() => handleSelectTrendingItem(item)}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-b border-border/50 last:border-none transition-colors"
                                                >
                                                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                                                    <span className="text-sm text-foreground truncate">{item}</span>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                        )}
                    </div>

                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">{t('nav.movies')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-55 gap-1 p-3">
                                        <li><NavigationMenuLink href="/movies/popular" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.popular')}</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/movies/now-playing" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.nowPlaying')}</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/movies/upcoming" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.upcoming')}</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/movies/top-rated" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.topRated')}</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">{t('nav.tvShows')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-55 gap-1 p-3">
                                        <li><NavigationMenuLink href="/tv/popular" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.popular')}</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/tv/on-the-air" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.onTheAir')}</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/tv/top-rated" className="block p-2 text-sm font-medium rounded-md hover:bg-accent">{t('menu.topRated')}</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/actors" className={navigationMenuTriggerStyle()}>
                                    {t('nav.actors')}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-4 shrink-0">
                        <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex items-center justify-center w-10 h-10 transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
                        >
                            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center w-10 h-10 text-sm font-bold transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
                        >
                            {i18n.language === "vi" ? "VI" : "EN"}
                        </button>

                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            {t('nav.login')}
                        </button>
                    </div>
                </div>
            </header>
    )
}