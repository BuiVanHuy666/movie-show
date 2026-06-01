import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PersonDetails } from "@/types/person.ts";
import { SocialLinks } from "@/components/common/media/MediaSocialLinks.tsx";

interface ActorSidebarProps {
	actor: PersonDetails;
	totalCredits: number;
	age: number | null;
}

export const Sidebar = ({ actor, totalCredits, age }: ActorSidebarProps) => {
	const { t } = useTranslation();

	return (
			<div className="w-full md:w-75 shrink-0 flex flex-col gap-6">
				<div className="rounded-xl overflow-hidden shadow-lg border border-border bg-muted aspect-2/3">
					{actor.profile_path ? (
							<img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="w-full h-auto object-cover" />
					) : (
							<div className="w-full h-full flex items-center justify-center">
								<User className="w-20 h-20 text-muted-foreground" />
							</div>
					)}
				</div>

				<SocialLinks externalIds={actor.external_ids} homepage={actor.homepage} type="person"/>

				<div className="space-y-4 bg-card p-5 rounded-xl border border-border shadow-sm text-left">
					<h3 className="font-bold text-xl border-b pb-2 mb-3">{t("actorDetails.personalInfo", "Personal Info")}</h3>

					<div>
						<p className="font-bold text-sm">{t("actorDetails.knownFor", "Known For")}</p>
						<p className="text-sm text-muted-foreground">{actor.known_for_department}</p>
					</div>

					<div>
						<p className="font-bold text-sm">{t("actorDetails.knownCredits", "Known Credits")}</p>
						<p className="text-sm text-muted-foreground">{totalCredits}</p>
					</div>

					<div>
						<p className="font-bold text-sm">{t("actorDetails.gender", "Gender")}</p>
						<p className="text-sm text-muted-foreground">
							{actor.gender === 1 ? t("actorDetails.female", "Female") : actor.gender === 2 ? t("actorDetails.male", "Male") : t("actorDetails.notSpecified", "Not specified")}
						</p>
					</div>

					<div>
						<p className="font-bold text-sm">{t("actorDetails.birthday", "Birthday")}</p>
						<p className="text-sm text-muted-foreground">
							{actor.birthday || t("movieDetails.noInfo", "No info")}
							{actor.birthday && !actor.deathday && age !== null && (
									<span className="ml-1">({t("actorDetails.yearsOld", { age: `${age} ${t("yearsOld", "years old")}` })})</span>
							)}
						</p>
					</div>

					{actor.deathday && (
							<div>
								<p className="font-bold text-sm">{t("actorDetails.deathday", "Day of Death")}</p>
								<p className="text-sm text-muted-foreground">
									{actor.deathday}
									{age !== null && <span className="ml-1">({t("actorDetails.passedAway", { age: `${age} ${t("yearsOld", "years old")}` })})</span>}
								</p>
							</div>
					)}

					<div>
						<p className="font-bold text-sm">{t("actorDetails.placeOfBirth", "Place of Birth")}</p>
						<p className="text-sm text-muted-foreground">{actor.place_of_birth || t("movieDetails.noInfo", "No info")}</p>
					</div>

					{actor.also_known_as && actor.also_known_as.length > 0 && (
							<div>
								<p className="font-bold text-sm mb-1">{t("actorDetails.alsoKnownAs", "Also Known As")}</p>
								<div className="flex flex-col gap-1 max-h-40 overflow-y-auto custom-scrollbar">
									{actor.also_known_as.map((name, i) => (
											<p key={i} className="text-xs text-muted-foreground border-l-2 pl-2 border-muted">{name}</p>
									))}
								</div>
							</div>
					)}
				</div>
			</div>
	);
};