export const PATHS = {
	HOME: '/movie-show/',

	MOVIES: {
		POPULAR: '/movie-show/movies',
		NOW_PLAYING: '/movie-show/movies/now-playing',
		UP_COMING: '/movie-show/movies/upcoming',
		TOP_RATED: '/movie-show/movies/top-rated',
		DETAIL_PATH: '/movie-show/movie/:movieId',
		DETAIL: (id: string | number) => `/movie-show/movie/${id}`,
	},

	ACTORS: {
		DETAIL_PATH: '/movie-show/actor/:actorId',
		DETAIL: (id: string | number) => `/movie-show/actor/${id}`,
	},

	TV: {
		POPULAR: '/movie-show/tv',
		ON_THE_AIR: '/movie-show/tv/on-the-air',
		TOP_RATED: '/movie-show/tv/top-rated',
		DETAIL_PATH: '/movie-show/tv/:tvId',
		DETAIL: (id: string | number) => `/movie-show/tv/${id}`,
	},

	SEARCH_PATH: '/movie-show/search',
	SEARCH: (keyword: string | number) => `/movie-show/search?query=${encodeURIComponent(keyword)}`,
}