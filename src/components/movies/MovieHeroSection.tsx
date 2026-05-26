import { Badge } from "@/components/ui/badge"
import type {
    Movie
} from "@/types/movie.ts";

interface MovieHeroSectionProps {
    movie: Movie;
}

export const MovieHeroSection = ({ movie }: MovieHeroSectionProps) => {
    const backdropUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "https://via.placeholder.com/1920x1080?text=No+Backdrop";

    const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Poster";

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const language = movie.original_language.toUpperCase();
    const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
    const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

    const scorePercent = movie.vote_average * 10; // Đổi thang 10 sang thang 100
    const radius = 35; // Bán kính vòng tròn
    const circumference = 2 * Math.PI * radius; // Chu vi
    const strokeDashoffset = circumference - (scorePercent / 100) * circumference; // Đoạn hở để tạo hiệu ứng thanh tiến trình

    return (
            // CONTAINER CHÍNH: Thiết lập chiều cao theo tỷ lệ vàng phim ảnh aspect-[16/9]
            <section className="relative w-full aspect-[2.35/1] overflow-hidden bg-zinc-950 text-white">

                {/* A. ẢNH NỀN LỚN (BACKDROP): Dùng absolute để phủ kín nền */}
                <div className="absolute inset-0 z-0">
                    <img
                            src={backdropUrl}
                            alt={`Backdrop của phim ${movie.title}`}
                            className="object-cover w-full h-full scale-105 blur-sm opacity-30" // Hiệu ứng blur nhẹ và làm mờ để tôn nội dung
                    />
                    {/* LỚP OVERLAY GRADIENT: Giúp phần chữ bên phải rõ ràng hơn, mờ dần sang trái */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                </div>

                {/* B. NỘI DUNG CHÍNH (CONTENT): Dùng z-10 để nằm trên lớp nền */}
                <div className="container relative z-10 flex h-full px-6 mx-auto items-center gap-10">

                    {/* B1. CỘT TRÁI: Ảnh Poster */}
                    <div className="flex-shrink-0 w-[300px] h-[450px] shadow-2xl rounded-2xl overflow-hidden border border-zinc-700">
                        <img
                                src={posterUrl}
                                alt={`Poster của phim ${movie.title}`}
                                className="object-cover w-full h-full"
                        />
                    </div>

                    {/* B2. CỘT PHẢI: Thông tin chi tiết */}
                    <div className="flex flex-col gap-6 max-w-3xl">

                        {/* 1. Tiêu đề và Năm */}
                        <h1 className="text-5xl font-extrabold tracking-tighter">
                            {movie.title}{" "}
                            <span className="font-light text-zinc-400">({releaseYear})</span>
                        </h1>

                        {/* 2. Các thẻ thông tin (Date, Language, Genres, Runtime) */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="font-mono text-zinc-300 border-zinc-700">
                                {movie.release_date || "N/A"}
                            </Badge>
                            <Badge variant="secondary" className="font-bold">
                                {language}
                            </Badge>

                            {/* Vòng lặp map() duyệt qua mảng genres */}
                            {movie.genres.map(genre => (
                                    <Badge key={genre.id} className="bg-indigo-600 hover:bg-indigo-700">
                                        {genre.name}
                                    </Badge>
                            ))}

                            {movie.runtime && (
                                    <Badge variant="outline" className="text-zinc-300 border-zinc-700">
                                        ⌛ {runtimeHours}g {runtimeMinutes}p
                                    </Badge>
                            )}
                        </div>

                        {/* 3. Vòng tròn User Score (Tái tạo bằng SVG chuẩn expert) */}
                        <div className="flex items-center gap-3 py-2">
                            <div className="relative flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full border-4 border-zinc-700 shadow-xl">
                                <svg className="w-16 h-16 transform -rotate-90">
                                    <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            fill="transparent"
                                            strokeWidth="6"
                                            className="stroke-zinc-700"
                                    />
                                    <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            fill="transparent"
                                            strokeWidth="6"
                                            className="stroke-emerald-400"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-2xl font-bold text-emerald-300">
                {scorePercent}<sup className="text-xs">%</sup>
              </span>
                            </div>
                            <span className="text-lg font-semibold text-zinc-100">Điểm của <br/> người dùng</span>
                        </div>

                        {/* 4. Slogan và Mô tả (Overview) */}
                        {movie.tagline && (
                                <p className="text-xl italic font-medium text-zinc-300 tracking-tight">
                                    &quot;{movie.tagline}&quot;
                                </p>
                        )}

                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold tracking-tight">Tổng quan</h2>
                            <p className="text-lg text-zinc-200 leading-relaxed max-w-2xl">
                                {movie.overview || "Đang cập nhật nội dung..."}
                            </p>
                        </div>

                        {/* 5. Team thực hiện (Ví dụ cứng) */}
                        <div className="grid grid-cols-3 gap-6 mt-2">
                            <div>
                                <p className="font-bold text-lg">Soo Hugh</p>
                                <p className="text-sm text-zinc-400">Tác giả, Nhà sản xuất</p>
                            </div>
                            <div>
                                <p className="font-bold text-lg">Theresa Kang-Lowe</p>
                                <p className="text-sm text-zinc-400">Nhà sản xuất điều hành</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
    )
}