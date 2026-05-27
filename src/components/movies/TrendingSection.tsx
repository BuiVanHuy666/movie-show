import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies } from "@/services/movieApi";
import type {
    Movie
} from "@/types/movie.ts";
import {
    useTranslation
} from "react-i18next";

export const TrendingSection = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setIsLoading(true);
            try {
                const data = await getTrendingMovies(timeWindow);
                setMovies(data.results);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrending();
    }, [timeWindow, i18n.language]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
        });
    };

    return (
            <section className="py-8">
                <div className="flex items-center gap-6 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Trending</h2>

                    <div className="flex items-center p-1 border rounded-full border-zinc-800 bg-zinc-950">
                        <button
                                onClick={() => setTimeWindow("day")}
                                className={`px-5 py-1 text-sm font-semibold rounded-full transition-colors ${
                                        timeWindow === "day"
                                                ? "bg-emerald-900/40 text-emerald-400"
                                                : "text-zinc-400 hover:text-zinc-200" 
                                }`}
                        >
                            Today
                        </button>
                        <button
                                onClick={() => setTimeWindow("week")}
                                className={`px-5 py-1 text-sm font-semibold rounded-full transition-colors ${
                                        timeWindow === "week"
                                                ? "bg-emerald-900/40 text-emerald-400"
                                                : "text-zinc-400 hover:text-zinc-200"
                                }`}
                        >
                            This Week
                        </button>
                    </div>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                    {isLoading ? (
                            <p className="text-muted-foreground animate-pulse">Đang tải danh sách Trending...</p>
                    ) : (
                            movies.map((movie) => (
                                    <div key={movie.id} className="shrink-0 w-40 group cursor-pointer" onClick={() => navigate(`/movie-show/movie/${movie.id}`)}>

                                        <div className="overflow-hidden rounded-xl aspect-2/3 mb-3 shadow-md">
                                            <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        <h3 className="font-bold text-sm leading-tight truncate" title={movie.title}>
                                            {movie.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            {formatDate(movie.release_date)}
                                        </p>
                                    </div>
                            ))
                    )}
                </div>
            </section>
    );
};