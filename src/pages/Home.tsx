import { Header } from "@/components/layouts/Header"
import { TrendingSection } from "@/components/movies/TrendingSection.tsx";
import { Footer } from "@/components/layouts/Footer.tsx";
import { PopularInTheatersSection } from "@/components/movies/PouplarInTheatersSection.tsx";

export const Home = () =>
	{
		return (
				<div className="min-h-screen bg-background text-foreground">
					<Header/>
					<main className="container px-4 mx-auto mt-6">
						<TrendingSection/>
						<PopularInTheatersSection/>
					</main>

					<Footer/>
				</div>
		)
	}
