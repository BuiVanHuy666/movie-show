export const PATHS = {
	HOME: '/',

	MOVIES: {
		POPULAR: '/movies',
		NOW_PLAYING: '/movies/now-playing',
		UP_COMING: '/movies/upcoming',
		TOP_RATED: '/movies/top-rated',
		DETAIL_PATH: '/movie/:movieId',
		DETAIL: (id: string | number) => `/movie/${id}`,
	},

	ACTORS: {
		POPULAR: '/actors',
		DETAIL_PATH: '/actor/:actorId',
		DETAIL: (id: string | number) => `/actor/${id}`,
	},

	TV: {
		POPULAR: '/tv',
		ON_THE_AIR: '/tv/on-the-air',
		TOP_RATED: '/tv/top-rated',
		DETAIL_PATH: '/tv/:tvId',
		DETAIL: (id: string | number) => `/tv/${id}`,
	},

	SEARCH_PATH: '/search',
	SEARCH: (keyword: string | number) => `/search?query=${encodeURIComponent(keyword)}`,
}