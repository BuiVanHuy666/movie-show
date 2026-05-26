import { createContext, useContext, useEffect, useState } from "react"

// 1. Chỉ còn 2 kiểu giao diện thực tế
type Theme = "dark" | "light"

type ThemeProviderProps = {
    children: React.ReactNode
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const getSystemTheme = (): Theme => {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "dark"
}

const initialState: ThemeProviderState = {
    theme: getSystemTheme(),
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => getSystemTheme())

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light")
        }

        mediaQuery.addEventListener("change", handleChange)

        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    const value = {
        theme,
        setTheme: (newTheme: Theme) => setTheme(newTheme),
    }

    return (
            <ThemeProviderContext.Provider {...props} value={value}>
                {children}
            </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")
    return context
}