export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string | null; // Ảnh nền lớn
    tagline: string | null; // Câu slogan của phim
    genres: Genre[]; // Mảng chứa các thể loại
    runtime: number | null; // Thời lượng phim (phút)
    original_language: string; // Ngôn ngữ gốc (vi, en, ko...)
};

export type TMDBResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};