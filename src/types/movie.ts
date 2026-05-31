import type {
	Genre, ProductionCompany, ProductionCountry, SpokenLanguage,
	Video, Keyword, ExternalIds, PaginatedResponse, Review,
	BasePerson, BaseMedia
} from "./common";

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
}

export interface Cast extends BasePerson {
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface Crew extends BasePerson {
	credit_id: string;
	department: string;
	job: string;
}

export interface CreditsResponse {
	cast: Cast[];
	crew: Crew[];
}

export interface Movie extends BaseMedia {
	title: string;
	original_title?: string;
	release_date: string;
	adult?: boolean;
	video?: boolean;
	tagline?: string | null;
}

export type SimilarMovie = Pick<Movie, "id" | "title" | "backdrop_path" | "poster_path" | "vote_average">

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
	belongs_to_collection: BelongsToCollection | null;
	budget: number;
	genres: Genre[];
	homepage: string;
	imdb_id: string | null;
	origin_country: string[];
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	revenue: number;
	runtime: number | null;
	softcore?: boolean;
	spoken_languages: SpokenLanguage[];
	status: string;
	similar?: PaginatedResponse<SimilarMovie>;
	recommendations?: PaginatedResponse<Movie>;
	videos?: { results: Video[] };
	keywords?: { keywords: Keyword[] };
	credits?: CreditsResponse;
	reviews?: PaginatedResponse<Review>;
	external_ids?: ExternalIds;
}

export type MoviesResponse = PaginatedResponse<Movie>;