import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type {
    Movie
} from "@/types/movie";
import { getNowPlayingMovies } from "@/services/movieApi";

export const PopularInTheatersSection = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInTheaters = async () => {
            setIsLoading(true);
            try {
                const data = await getNowPlayingMovies(1);
                setMovies(data.results);
            } catch (error) {
                console.error("Lỗi lấy phim In Theaters:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInTheaters();
    }, [i18n.language]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString(i18n.language === "vi" ? "vi-VN" : "en-US", {
            month: "long", day: "numeric", year: "numeric",
        });
    };

    return (
            <section className="py-8">
                <div className="flex items-center gap-6 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {t("home.whatsPopular")}
                    </h2>

                    <div className="flex items-center p-1 rounded-full bg-teal-950 border border-teal-900 shadow-inner">
                        <button className="px-5 py-1 text-sm font-semibold rounded-full bg-teal-800 text-teal-200 transition-all">
                            {t("home.inTheaters")}
                        </button>
                    </div>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
                    {isLoading ? (
                            <p className="text-muted-foreground animate-pulse py-10">Loading...</p>
                    ) : (
                            movies.map((movie) => (
                                    <div key={movie.id} className="shrink-0 w-37.5 group cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>

                                        <div className="relative overflow-hidden rounded-xl aspect-2/3 mb-3 shadow-md bg-zinc-900 border border-border/50">
                                            <img
                                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
                                                    alt={movie.title}
                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                            />
                                            <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-black/40 backdrop-blur-md rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                                                •••
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-sm leading-tight text-foreground truncate-2-lines h-10" title={movie.title}>
                                            {movie.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDate(movie.release_date)}
                                        </p>
                                    </div>
                            ))
                    )}
                </div>
            </section>
    );
};