import { createBrowserRouter } from "react-router-dom";
import { ClientLayout } from "@/layouts/ClientLayout.tsx";
import { PATHS } from "@/app/routes/routes.ts";
import { HomePage } from "@/pages/HomePage.tsx";
import { RootErrorBoundary } from "@/app/routes/RootErrorBoundary.tsx";
import { DetailLayout } from "@/layouts/DetailLayout.tsx";
import { MovieDetail } from "@/pages/MovieDetail.tsx";
import { SearchPage } from "@/pages/SearchPage.tsx";

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
		element: <DetailLayout/>,
		errorElement: <RootErrorBoundary />,
		children: [
			{
				path: PATHS.MOVIES.DETAIL_PATH,
				element: <MovieDetail/>
			}
		]
	}
])