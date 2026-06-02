import { SearchHero } from "@/components/homepage/SearchHero.tsx";
import { useTranslation } from "react-i18next";
import { MediaList } from "@/components/homepage/MediaList.tsx";

export const HomePage = () => {
	const { t } = useTranslation();

	return (
			<div className="min-h-screen bg-background text-foreground">
				<SearchHero />

				<div className="container mx-auto px-4 pb-12">
					<MediaList
							title={t("home.trendingMovies")}
							mediaType="movie"
							sectionType="trending"
					/>
					<MediaList
							title={t("home.whatsPopular")}
							mediaType="movie"
							sectionType="in_theaters"
					/>

					<MediaList
							title={t("home.popularTv")}
							mediaType="tv"
							sectionType="popular"
					/>
					<MediaList
							title={t("home.onTheAirTv")}
							mediaType="tv"
							sectionType="on_the_air"
					/>
				</div>
			</div>
	);
};