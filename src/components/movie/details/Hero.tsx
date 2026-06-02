import { Play, ExternalLink, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { ScoreCircle } from "@/components/movie/details/ScoreCircle.tsx";
import { useTranslation } from "react-i18next";
import { formatRuntime } from "@/utils/movieUtils.ts";
import type { MovieDetails } from "@/types/movie.ts";

type MovieHeroProps = {
	movie: MovieDetails
	trailerKey: string | null;
}

export const Hero = ({movie, trailerKey}: MovieHeroProps) => {
	const {t} = useTranslation();
	const releaseYear = movie.release_date?.substring(0, 4) ?? "";
	const userScore = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;

	return (
			<div className="relative w-full min-h-125 bg-zinc-950 flex items-center text-white overflow-hidden">
				<div className="absolute inset-0 z-0">
					{movie.backdrop_path ? (
							<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="w-full h-full object-cover"/>
					) : (
							<div className="w-full h-full bg-zinc-900 flex items-center justify-center">
								<ImageIcon className="w-20 h-20 text-zinc-800"/>
							</div>
					)}
					<div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px]"/>
				</div>

				<div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 px-4 sm:px-6 md:px-12 py-8 md:py-12 w-full container mx-auto">

					<div className="w-40 sm:w-48 md:w-64 shrink-0">
						<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-zinc-700/50"/>
					</div>

					<div className="flex-1 min-w-0 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left">

						<h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-words w-full">
							{movie.title}
							<span className="font-normal text-zinc-300 inline-block ml-2">({releaseYear})</span>
						</h1>

						<div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 mt-3 text-sm md:text-base text-zinc-200">
							{movie.release_date && (
									<div className="flex items-center gap-1.5 shrink-0">
										<Calendar className="w-4 h-4 text-zinc-400"/>
										<span>{movie.release_date}</span>
									</div>
							)}
							{movie.genres && movie.genres.length > 0 && (
									<div className="flex items-center gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-zinc-500 hidden md:block"/>
										<span className="break-words">{movie.genres?.map((g) => g.name)
												.join(", ")}</span>
									</div>
							)}
							{movie.runtime && (
									<div className="flex items-center gap-1.5 shrink-0">
										<span className="w-1.5 h-1.5 rounded-full bg-zinc-500 hidden md:block"/>
										<Clock className="w-4 h-4 text-zinc-400"/>
										<span>{formatRuntime(movie.runtime, t)}</span>
									</div>
							)}
						</div>

						<div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 mt-6 w-full">
							<ScoreCircle score={userScore}/>
							{trailerKey && (
									<a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-emerald-400 transition-colors cursor-pointer">
										<Play className="w-5 h-5 md:w-6 md:h-6 fill-current group-hover:scale-110 transition-transform shrink-0"/>
										<span className="font-bold text-base md:text-lg whitespace-nowrap">{t("movieDetails.playTrailer")}</span>
										<ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0 hidden md:block"/>
									</a>
							)}
						</div>

						{movie.tagline && (
								<div className="text-zinc-400 italic text-base md:text-lg mt-6 font-medium break-words w-full">
									"{movie.tagline}"
								</div>
						)}

						<div className="mt-4 md:mt-3 w-full">
							<h3 className="font-bold text-lg md:text-xl mb-2">{t("movieDetails.overview")}</h3>
							<p className="text-sm md:text-base text-zinc-200 leading-relaxed max-w-4xl break-words">
								{movie.overview || t("movieDetails.noInfo")}
							</p>
						</div>

						{movie.belongs_to_collection && (
								<div className="mt-6 inline-block bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 w-full sm:w-auto break-words">
									<h4 className="font-bold text-base md:text-lg text-white">
										{t("movieDetails.collection", {name: movie.belongs_to_collection.name})}
									</h4>
								</div>
						)}
					</div>
				</div>
			</div>
	);
};