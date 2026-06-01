import { Outlet, ScrollRestoration } from "react-router-dom";

export const MasterLayout = () => {
	return (
			<>
				<Outlet />
				<ScrollRestoration />
			</>
	);
};