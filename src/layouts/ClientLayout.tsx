import { Header } from "@/components/common/Header.tsx";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/common/Footer.tsx";

export const ClientLayout = () =>
	{
		return (
				<>
					<Header/>
					<main className="container px-4 mx-auto mt-6">
						<Outlet/>
					</main>
					<Footer/>
				</>
		);
	};