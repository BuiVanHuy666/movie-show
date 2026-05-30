import { Outlet } from "react-router-dom";
import { Footer } from "@/components/common/Footer.tsx";
import { Header } from "@/components/common/Header.tsx";

export const MediaListingLayout = () =>
	{
		return (
				<>
					<Header/>
					<main className="container px-4 mx-auto mt-6 flex flex-col md:flex-row gap-8 items-start">
						<Outlet/>
					</main>
					<Footer/>
				</>
		);
	};