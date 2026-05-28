import { RouterProvider } from "react-router-dom";
import { AppRoute } from "@/app/routes/AppRoute.tsx";

function App() {
	return <RouterProvider router={AppRoute}/>
}

export default App