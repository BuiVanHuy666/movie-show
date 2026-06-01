import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS } from "@/app/routes/routes.ts";
import type { Cast, Crew } from "@/types/movie.ts";
import type { AggregateCast, AggregateCrew } from "@/types/tvShow.ts";

type PersonData = Cast | Crew | AggregateCast | AggregateCrew;

interface PersonListProps {
	title: string;
	data: PersonData[];
	episodesText?: string;
}

export const MediaPersonList = ({ title, data, episodesText }: PersonListProps) => {
	if (!data || data.length === 0) return null;

	return (
			<div className="space-y-4 pt-4 border-t border-border">
				<h3 className="font-bold text-xl flex items-center gap-2">
					{title}
				</h3>
				<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar select-none">
					{data.map((person, index) => {
						const roleName = 'roles' in person ? person.roles?.[0]?.character
								: 'jobs' in person ? person.jobs?.[0]?.job
										: 'character' in person ? person.character
												: 'job' in person ? person.job
														: '';

						const episodeCount = 'roles' in person ? person.roles?.[0]?.episode_count
								: 'jobs' in person ? person.jobs?.[0]?.episode_count
										: null;

						return (
								<Link
										to={PATHS.ACTORS.DETAIL(person.id)}
										key={`${person.id}-${index}`}
										className="w-32 shrink-0 cursor-pointer group block"
								>
									<div className="rounded-lg overflow-hidden shadow-sm mb-2 aspect-2/3 bg-muted border border-border/50">
										{person.profile_path ? (
												<img
														src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
														alt={person.name}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
														draggable={false}
												/>
										) : (
												<div className="w-full h-full flex items-center justify-center">
													<User className="w-8 h-8 text-muted-foreground/50" />
												</div>
										)}
									</div>
									<p className="text-sm font-bold truncate group-hover:text-sky-500 transition-colors">
										{person.name}
									</p>
									<p className="text-xs text-foreground mt-0.5 truncate font-medium">
										{roleName}
									</p>
									{episodeCount && (
											<p className="text-[11px] text-muted-foreground mt-0.5">
												{episodeCount} {episodesText}
											</p>
									)}
								</Link>
						);
					})}
				</div>
			</div>
	);
};