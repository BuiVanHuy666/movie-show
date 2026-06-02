import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import type { ActingCredit, CrewCredit } from "@/types/person.ts";
import { calculateAge } from "@/utils/personUtils.ts";
import { Sidebar } from "@/components/person/SideBar.tsx";
import { Biography } from "@/components/person/Biography.tsx";
import { KnownFor } from "@/components/person/KnowFor.tsx";
import { CreditHistory } from "@/components/person/CreditHistory.tsx";

import { useDocumentTitle } from "@/hooks/useDocumentTitle.ts";
import { usePersonDetail } from "@/hooks/usePersonDetails.ts";

export const ActorDetailPage = () => {
	const { actorId } = useParams<{ actorId: string }>();
	const { t, i18n } = useTranslation();

	const { person, isLoading } = usePersonDetail(actorId, i18n.language);

	useDocumentTitle(person?.name || t("loadingTableTitle"));

	if (isLoading) {
		return (
				<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
					<Skeleton className="w-full md:w-75 h-112.5 rounded-xl shrink-0" />
					<div className="flex-1 space-y-4">
						<Skeleton className="h-12 w-1/2" />
						<Skeleton className="h-6 w-1/4" />
						<Skeleton className="h-32 w-full" />
					</div>
				</div>
		);
	}

	if (!person) return <div className="text-center py-20">{t("movieDetails.notFound")}</div>;

	const age = calculateAge(person.birthday, person.deathday);
	const totalCredits = (person.combined_credits?.cast?.length || 0) + (person.combined_credits?.crew?.length || 0);
	const knownForMovies = person.combined_credits?.cast?.filter(c => c.poster_path)?.sort((a, b) => b.vote_count - a.vote_count)?.slice(0, 8) || [];

	const mapAndSortCredits = (list?: ActingCredit[] | CrewCredit[]) => list?.map(c => ({
		...c,
		release_year: (c.release_date || c.first_air_date || "").substring(0, 4)
	})).sort((a, b) => {
		if (!a.release_year) return -1;
		if (!b.release_year) return 1;
		return parseInt(b.release_year) - parseInt(a.release_year);
	}) || [];

	const actingHistory = mapAndSortCredits(person.combined_credits?.cast);
	const crewHistory = mapAndSortCredits(person.combined_credits?.crew);

	return (
			<div className="min-h-screen bg-background text-foreground pb-12 mt-6">
				<div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
					<Sidebar actor={person} totalCredits={totalCredits} age={age} />

					<div className="flex-1 min-w-0 flex flex-col gap-8">
						<Biography name={person.name} biography={person.biography} />
						<KnownFor items={knownForMovies} />
						<CreditHistory title={t("actorDetails.acting", "Acting")} history={actingHistory} roleType="acting" />
						<CreditHistory title={t("actorDetails.production", "Production / Crew")} history={crewHistory} roleType="production" />
					</div>
				</div>
			</div>
	);
};