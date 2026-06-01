import { FaFacebook, FaTwitter, FaInstagram, FaImdb } from "react-icons/fa";
import { LinkIcon } from "lucide-react";
import type { MovieDetails } from "@/types/movie.ts";
import { formatCurrency, getLanguageName } from "@/utils/movieUtils.ts";
import { useTranslation } from "react-i18next";

type MovieSidebarProps = {
	movie: MovieDetails
}

export const Sidebar = ({movie}: MovieSidebarProps) => {
	const { t, i18n } = useTranslation();
	return (
			<div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
				<div className="flex items-center gap-4 text-foreground px-1">
					{/* Social Links */}
					{movie.external_ids?.facebook_id && (
							<a href={`https://facebook.com/${movie.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer">
								<FaFacebook className="w-6 h-6 hover:text-sky-500 cursor-pointer transition-colors" />
							</a>
					)}
					{movie.external_ids?.twitter_id && (
							<a href={`https://twitter.com/${movie.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer">
								<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer transition-colors" />
							</a>
					)}
					{movie.external_ids?.instagram_id && (
							<a href={`https://instagram.com/${movie.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer">
								<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
							</a>
					)}
					{movie.external_ids?.imdb_id && (
							<a href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer">
								<FaImdb className="w-6 h-6 hover:text-amber-400 cursor-pointer transition-colors" />
							</a>
					)}
					{movie.homepage && (
							<a href={movie.homepage} target="_blank" rel="noopener noreferrer">
								<LinkIcon className="w-6 h-6 hover:text-emerald-500 cursor-pointer transition-colors" />
							</a>
					)}
				</div>

				<div className="space-y-5">
					{/* Stats */}
					<div>
						<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.originalTitle")}</p>
						<p className="text-sm font-medium text-foreground">{movie.original_title || t('movieDetails.noInfo')}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.status")}</p>
						<p className="text-sm font-medium text-foreground">{movie.status || t('movieDetails.noInfo')}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.originalLanguage")}</p>
						<p className="text-sm font-medium text-foreground capitalize">
							{movie.original_language ? getLanguageName(movie.original_language, i18n.language) : t('movieDetails.noInfo')}
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.budget")}</p>
						<p className="text-sm font-medium text-foreground">{formatCurrency(movie.budget, t('movieDetails.noInfo'))}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.revenue")}</p>
						<p className="text-sm font-medium text-foreground">{formatCurrency(movie.revenue, t('movieDetails.noInfo'))}</p>
					</div>

					{/* Arrays (Countries, Languages, Companies) */}
					{movie.production_countries?.length > 0 && (
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.productionCountries")}</p>
								<p className="text-sm font-medium text-foreground">{movie.production_countries.map(c => c.name).join(", ")}</p>
							</div>
					)}
					{movie.spoken_languages?.length > 0 && (
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.spokenLanguages")}</p>
								<p className="text-sm font-medium text-foreground">{movie.spoken_languages.map(l => l.english_name).join(", ")}</p>
							</div>
					)}
					{movie.production_companies?.length > 0 && (
							<div>
								<p className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-wider">{t("movieDetails.productionCompanies")}</p>
								<p className="text-sm font-medium text-foreground">{movie.production_companies.map(c => c.name).join(", ")}</p>
							</div>
					)}

					{/* Keywords */}
					<div className="pt-2">
						<p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wider">{t("movieDetails.keywords")}</p>
						<div className="flex flex-wrap gap-2">
							{movie.keywords?.keywords?.length ? (
									movie.keywords.keywords.map((kw) => (
											<span key={kw.id} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-secondary/80 transition-colors">
                                    {kw.name}
                                </span>
									))
							) : (
									<span className="text-xs text-muted-foreground italic">{t("movieDetails.noKeywords")}</span>
							)}
						</div>
					</div>
				</div>
			</div>
	);
};