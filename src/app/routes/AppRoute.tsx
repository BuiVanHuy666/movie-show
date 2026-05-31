import { createBrowserRouter } from "react-router-dom";
import { ClientLayout } from "@/layouts/ClientLayout.tsx";
import { PATHS } from "@/app/routes/routes.ts";
import { HomePage } from "@/pages/HomePage.tsx";
import { RootErrorBoundary } from "@/app/routes/RootErrorBoundary.tsx";
import { DetailLayout } from "@/layouts/DetailLayout.tsx";
import { MovieDetailPage } from "@/pages/MovieDetailPage.tsx";
import { SearchPage } from "@/pages/SearchPage.tsx";
import { ActorDetailPage } from "@/pages/ActorDetailPage.tsx";
import { TVShowsDetailPage } from "@/pages/TVShowsDetailPage.tsx";
import { MediaListingLayout } from "@/layouts/MediaListingLayout.tsx";
import { MovieCategoryPage } from "@/pages/movies/MovieCategoryPage.tsx";
import { TvShowCategoryPage } from "@/pages/tvShows/TvShowCategoryPage.tsx";

export const AppRoute = createBrowserRouter([
	{
		element: <ClientLayout/>,
		errorElement: <RootErrorBoundary/>,
		children: [
			{
				path: PATHS.HOME,
				element: <HomePage/>
			},
			{
				path: PATHS.SEARCH_PATH,
				element: <SearchPage/>
			}
		]
	},
	{
		element: <MediaListingLayout/>,
		errorElement: <RootErrorBoundary/>,
		children: [
			{
				path: PATHS.MOVIES.POPULAR,
				element: <MovieCategoryPage type="popular" />
			},
			{
				path: PATHS.MOVIES.NOW_PLAYING,
				element: <MovieCategoryPage type="now_playing" />
			},
			{
				path: PATHS.MOVIES.UP_COMING,
				element: <MovieCategoryPage type="upcoming" />
			},
			{
				path: PATHS.MOVIES.TOP_RATED,
				element: <MovieCategoryPage type="top_rated" />
			},
			{
				path: PATHS.TV.POPULAR,
				element: <TvShowCategoryPage type={"popular"} />
			},
			{
				path: PATHS.TV.ON_THE_AIR,
				element: <TvShowCategoryPage type={"on_the_air"} />
			},
			{
				path: PATHS.TV.TOP_RATED,
				element: <TvShowCategoryPage type={"top_rated"} />
			}
		]
	},
	{
		element: <DetailLayout/>,
		errorElement: <RootErrorBoundary />,
		children: [
			{
				path: PATHS.MOVIES.DETAIL_PATH,
				element: <MovieDetailPage/>
			},
			{
				path: PATHS.ACTORS.DETAIL_PATH,
				element: <ActorDetailPage/>
			},
			{
				path: PATHS.TV.DETAIL_PATH,
				element: <TVShowsDetailPage/>
			}
		]
	}
])