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
    backdrop_path: string | null;
    tagline: string | null;
    genres: Genre[];
    runtime: number | null;
    original_language: string;
};

export type TMDBResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
};

export type CreditsResponse = {
    cast: Cast[];
};

export type Review = {
    id: string;
    author: string;
    content: string;
    created_at: string;
    author_details: {
        avatar_path: string | null;
        rating: number | null;
    };
};

export type ReviewsResponse = {
    results: Review[];
};


export interface SimilarMovie {
	id: number;
	title: string;
	backdrop_path: string | null;
	poster_path: string | null;
	vote_average: number;
}

export interface Video {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
}

export interface Keyword {
	id: number;
	name: string;
}

export interface MovieDetails {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	runtime: number | null;
	tagline: string | null;
	status: string;
	budget: number;
	revenue: number;
	original_title: string;
	original_language: string;
	genres: {
		id: number;
		name: string
	}[];
	production_companies: ProductionCompany[];
	videos?: {
		results: Video[];
	};
	keywords?: {
		keywords: Keyword[];
	};
}
