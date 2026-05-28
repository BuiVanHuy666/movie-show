import { TrendingSection } from "@/features/movies/TrendingSection.tsx";
import { PopularInTheatersSection } from "@/features/movies/PouplarInTheatersSection.tsx";

export const Home = () =>
	{
		return (
				<div className="min-h-screen bg-background text-foreground">
						<TrendingSection/>
						<PopularInTheatersSection/>
				</div>
		)
	}
