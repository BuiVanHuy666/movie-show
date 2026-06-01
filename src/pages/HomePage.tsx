import { TrendingSection } from "@/components/homepage/TrendingSection.tsx";
import { PopularInTheatersSection } from "@/components/homepage/PouplarInTheatersSection.tsx";
import { SearchHero } from "@/components/homepage/SearchHero.tsx";

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
