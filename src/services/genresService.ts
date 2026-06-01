import api from "@/app/configs/api.ts";
import type { GenreResponse } from "@/types/common.ts";

export const getGenres = (type: string = 'movie') => api.get<GenreResponse>(`/genre/${type}/list`);
