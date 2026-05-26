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

export const Header = () => {
    const [language, setLanguage] = useState<"VI" | "EN">("VI")

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "VI" ? "EN" : "VI"))
    }

    return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 mx-auto">

                    <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                        MovieShow
                    </span>
                    </div>

                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">Phim</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-55 gap-1 p-3">
                                        <li>
                                            <NavigationMenuLink href="/movies/popular" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Nổi bật
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink href="/movies/now-playing" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Đang chiếu
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink href="/movies/upcoming" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Sắp chiếu
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink href="/movies/top-rated" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Đánh giá cao
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">TV Shows</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-55 gap-1 p-3">
                                        <li>
                                            <NavigationMenuLink href="/tv/popular" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Nổi bật
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink href="/tv/on-the-air" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Đang phát sóng
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink href="/tv/top-rated" className="block p-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                                Đánh giá cao
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/actors" className={navigationMenuTriggerStyle()}>
                                    Diễn viên
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-4">
                        <button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center w-10 h-10 text-sm font-bold transition-colors border rounded-md border-border hover:bg-accent hover:text-accent-foreground"
                        >
                            {language}
                        </button>

                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Đăng nhập
                        </button>
                    </div>

                </div>
            </header>
    )
}