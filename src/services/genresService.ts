import api from "@/app/configs/api.ts";
import type { Genre } from "@/types/common.ts";


export const getGenres = (type: string = 'movie') => api.get<Genre[]>(`/genre/${type}/list`);
