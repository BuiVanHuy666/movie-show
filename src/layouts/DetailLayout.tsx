import { DetailHeader } from "@/components/common/DetailHeader.tsx";
import { Footer } from "@/components/common/Footer.tsx";
import { Outlet } from "react-router-dom";

export const DetailLayout = () =>
	{
		return (
				<div className="min-h-screen bg-background text-foreground">
					<DetailHeader/>
					<Outlet/>
					<Footer/>
				</div>
		);
	};