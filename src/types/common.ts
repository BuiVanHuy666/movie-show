export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface Video {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	id: string;
	published_at: string;
}

export interface Keyword {
	id: number;
	name: string;
}

export interface ExternalIds {
	imdb_id?: string | null;
	facebook_id?: string | null;
	instagram_id?: string | null;
	twitter_id?: string | null;
	wikidata_id?: string | null;
	tiktok_id?: string | null;
	youtube_id?: string | null;
}

export interface PaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface ReviewAuthorDetails {
	name: string;
	username: string;
	avatar_path: string | null;
	rating: number | null;
}

export interface Review {
	author: string;
	author_details: ReviewAuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface BasePerson {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
}

export interface BaseMedia {
	id: number;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	vote_average: number;
	vote_count: number;
	popularity?: number;
	original_language?: string;
	genre_ids?: number[];
}