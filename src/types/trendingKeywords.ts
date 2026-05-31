import type { PaginatedResponse } from "@/types/common.ts";

export interface Keyword {
	id: number;
    name?: string;
	title?: string;
}

export type TrendingKeywordsResponse = PaginatedResponse<Keyword>;