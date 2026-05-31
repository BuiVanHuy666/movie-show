import type {
	Genre, ProductionCompany, ProductionCountry, SpokenLanguage,
	Video, Keyword, ExternalIds, PaginatedResponse, BasePerson, BaseMedia
} from "./common";

export interface TvShow extends BaseMedia {
	name: string;
	original_name: string;
	first_air_date: string;
}

export interface Episode {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number | null;
	season_number: number;
	show_id: number;
	still_path: string | null;
}

export interface Season {
	air_date: string | null;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
}

export interface AggregateCast extends BasePerson {
	roles: {
		credit_id: string;
		character: string;
		episode_count: number;
	}[];
	total_episode_count: number;
	order: number;
}

export interface AggregateCrew extends BasePerson {
	jobs: {
		credit_id: string;
		job: string;
		episode_count: number;
	}[];
	department: string;
	total_episode_count: number;
}

export interface TVDetails extends Omit<TvShow, "genre_ids"> {
	adult: boolean;
	in_production: boolean;
	homepage: string | null;
	last_air_date: string;
	status: string;
	tagline: string;
	type: string;
	number_of_episodes: number;
	number_of_seasons: number;
	episode_run_time: number[];
	origin_country: string[];
	genres: Genre[];
	networks: ProductionCompany[];
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	spoken_languages: SpokenLanguage[];
	created_by: BasePerson[] & { credit_id: string };
	last_episode_to_air: Episode | null;
	next_episode_to_air: Episode | null;
	seasons: Season[];
	aggregate_credits?: {
		cast: AggregateCast[];
		crew: AggregateCrew[];
	};
	external_ids?: ExternalIds;
	videos?: { results: Video[] };
	keywords?: { results: Keyword[] };
	recommendations?: PaginatedResponse<TvShow>;
	similar?: PaginatedResponse<TvShow>;
	content_ratings?: { results: { iso_3166_1: string; rating: string; descriptors: string[] }[] };
}