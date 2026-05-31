import type { ExternalIds, BaseMedia, PaginatedResponse, BasePerson } from "./common";

export interface KnownFor {
	id: number;
	media_type: 'movie' | 'tv';
	title?: string;
	name?: string;
	poster_path: string | null;
	backdrop_path: string | null;
	overview: string;
}

export interface PopularPerson extends BasePerson {
	known_for: KnownFor[];
}

export interface PersonDetails {
	id: number;
	name: string;
	age: number;
	biography: string;
	gender: number;
	email: string;
	phone: string;
	address: string;
	picture: string;
	also_known_as: string[];
	birthday: string;
	deathday: string | null;
	place_of_birth: string;
	popularity: number;
	profile_path: string | null;
	homepage: string | null;
	imdb_id: string;
	known_for_department: string;
	combined_credits?: {
		cast: ActingCredit[];
		crew: CrewCredit[];
	};
	external_ids?: ExternalIds;
}

export interface BaseCredit extends Pick<BaseMedia, 'id' | 'backdrop_path' | 'poster_path' | 'vote_count' | 'vote_average'> {
	release_date?: string;
	first_air_date?: string;
	media_type: 'movie' | 'tv';
	title?: string;
	name?: string;
	credit_id: string;
}

export interface ActingCredit extends BaseCredit {
	character: string;
	order: number;
}

export interface CrewCredit extends BaseCredit {
	job: string;
	department: string;
}

export type PersonsResponse = PaginatedResponse<PopularPerson>;