import { useEffect, useState } from "react";
import { getTrendingMovies } from "@/services/movieApi";
import type {
    Movie
} from "@/types/movie.ts";

export const TrendingSection = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
    const [isLoading, setIsLoading] = useState(true);

    // Gọi API mỗi khi người dùng bấm đổi Tab (timeWindow thay đổi)
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
    }, [timeWindow]);

    // Hàm chuyển đổi format ngày tháng (VD: 2026-04-16 -> Apr 16, 2026)
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
        });
    };

    return (
            <section className="py-8">
                {/* --- PHẦN 1: HEADER & TOGGLE --- */}
                <div className="flex items-center gap-6 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Trending</h2>

                    {/* Nút Toggle Switch */}
                    <div className="flex items-center p-1 border rounded-full border-zinc-800 bg-zinc-950">
                        <button
                                onClick={() => setTimeWindow("day")}
                                className={`px-5 py-1 text-sm font-semibold rounded-full transition-colors ${
                                        timeWindow === "day"
                                                ? "bg-emerald-900/40 text-emerald-400" // Trạng thái Active
                                                : "text-zinc-400 hover:text-zinc-200"  // Trạng thái Inactive
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

                {/* --- PHẦN 2: DANH SÁCH CUỘN NGANG --- */}
                {/* Thủ thuật CSS: [&::-webkit-scrollbar]:hidden giúp giấu thanh cuộn trên Chrome/Safari */}
                <div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {isLoading ? (
                            <p className="text-muted-foreground animate-pulse">Đang tải danh sách Trending...</p>
                    ) : (
                            movies.map((movie) => (
                                    /* Thẻ phim thu gọn (Không dùng Card của Shadcn để giống ảnh thiết kế nhất) */
                                    <div key={movie.id} className="flex-shrink-0 w-[160px] group cursor-pointer">

                                        {/* Hình ảnh */}
                                        <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3 shadow-md">
                                            <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {/* Dấu 3 chấm ở góc phải (Mô phỏng UI) */}
                                            <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                •••
                                            </div>
                                        </div>

                                        {/* Thông tin */}
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