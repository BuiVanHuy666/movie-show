import { Moon, Sun, Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    useTheme
} from "@/components/theme-provider.tsx";

interface HeaderProps {
    onSearch: (keyword: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
    const { theme, setTheme } = useTheme()
    const { t, i18n } = useTranslation()
    const [searchKey, setSearchKey] = useState("")

    const toggleLanguage = async () => {
        const newLang = i18n.language === "vi" ? "en" : "vi";

        await i18n.changeLanguage(newLang);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchKey.trim());
    };

    return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 mx-auto gap-4">

                    <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                        MovieShow
                    </span>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="relative grow max-w-sm mx-4">
                        <input
                                type="text"
                                placeholder={t('nav.search.placeholder')}
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                className="w-full h-9 pl-9 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-foreground"
                        />
                        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    {/* 3. Phần Menu điều hướng (Giữ nguyên cấu trúc cũ) */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">{t('nav.movies')}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[220px] gap-1 p-3">
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
                                    <ul className="grid w-[220px] gap-1 p-3">
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

                    <div className="flex items-center gap-4 flex-shrink-0">
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