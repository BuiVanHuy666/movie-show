export const PATHS = {
	HOME: '/movie-show/',

	MOVIES: {
		POPULAR: '/movie-show/movies/popular',
		NOW_PLAYING: '/movie-show/movies/now-playing',
		DETAIL_PATH: '/movie-show/movie/:movieId',
		DETAIL: (id: string | number) => `/movie-show/movie/${id}`,
	},

	ACTORS: {
		DETAIL_PATH: '/movie-show/actor/:actorId',
		DETAIL: (id: string | number) => `/movie-show/actor/${id}`,
	},

	TV: {
		DETAIL_PATH: '/movie-show/tv/:tvId',
		DETAIL: (id: string | number) => `/movie-show/tv/${id}`,
	},

	SEARCH_PATH: '/movie-show/search',
	SEARCH: (keyword: string | number) => `/movie-show/search?query=${encodeURIComponent(keyword)}`,
}