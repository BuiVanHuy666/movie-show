import { FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaImdb } from "react-icons/fa";
import { LinkIcon } from "lucide-react";
import type { ExternalIds } from "@/types/common.ts";

interface SocialLinksProps {
	externalIds?: ExternalIds;
	homepage?: string | null;
	type?: "media" | "person";
}

export const SocialLinks = ({ externalIds, homepage, type = "media" }: SocialLinksProps) => {
	if (!externalIds && !homepage) return null;

	const imdbUrl = type === "person"
			? `https://www.imdb.com/name/${externalIds?.imdb_id}`
			: `https://www.imdb.com/title/${externalIds?.imdb_id}`;

	return (
			<div className="flex flex-wrap items-center gap-4 text-foreground justify-center md:justify-start">
				{externalIds?.facebook_id && (
						<a href={`https://facebook.com/${externalIds.facebook_id}`} target="_blank" rel="noopener noreferrer" title="Facebook">
							<FaFacebook className="w-6 h-6 hover:text-sky-500 cursor-pointer transition-colors" />
						</a>
				)}
				{externalIds?.twitter_id && (
						<a href={`https://twitter.com/${externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer" title="Twitter/X">
							<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer transition-colors" />
						</a>
				)}
				{externalIds?.instagram_id && (
						<a href={`https://instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer" title="Instagram">
							<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer transition-colors" />
						</a>
				)}


				{externalIds && 'tiktok_id' in externalIds && externalIds.tiktok_id && (
						<a href={`https://tiktok.com/@${externalIds.tiktok_id}`} target="_blank" rel="noopener noreferrer" title="TikTok">
							<FaTiktok className="w-6 h-6 hover:text-zinc-500 cursor-pointer transition-colors" />
						</a>
				)}
				{externalIds && 'youtube_id' in externalIds && externalIds.youtube_id && (
						<a href={`https://youtube.com/${externalIds.youtube_id}`} target="_blank" rel="noopener noreferrer" title="YouTube">
							<FaYoutube className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
						</a>
				)}

				{externalIds?.imdb_id && (
						<a href={imdbUrl} target="_blank" rel="noopener noreferrer" title="IMDb">
							<FaImdb className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition-colors" />
						</a>
				)}
				{homepage && (
						<a href={homepage} target="_blank" rel="noopener noreferrer" title="Website">
							<LinkIcon className="w-6 h-6 hover:text-emerald-500 cursor-pointer transition-colors" />
						</a>
				)}
			</div>
	);
};