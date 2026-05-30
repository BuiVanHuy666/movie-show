import api from "@/app/configs/api.ts";

type GenreType = 'movie' | 'tv';

export const getGenres = (type: GenreType = 'movie') => api.get(`/genre/${type}/list`);
