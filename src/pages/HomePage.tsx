import { TrendingSection } from "@/features/movies/TrendingSection.tsx";
import { PopularInTheatersSection } from "@/features/movies/PouplarInTheatersSection.tsx";
import { SearchHero } from "@/features/movies/SearchHero.tsx";

export const HomePage = () =>
	{
		return (
				<div className="min-h-screen bg-background text-foreground">
					<SearchHero/>
					<TrendingSection/>
					<PopularInTheatersSection/>
				</div>
		)
	}
