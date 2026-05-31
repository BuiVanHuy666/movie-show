import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { MediaGrid } from "@/components/common/MediaGrid.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { TvShow } from "@/types/tvShow.ts";
import { TVService } from "@/services/mediaService.ts";

export const TvShowCategoryPage = ({type}: { type: string }) =>
	{
		const [tvShows, setTVShows] = useState<TvShow[]>([]);
		const {i18n} = useTranslation();

		useEffect(() => {
			const fetchTVShows = async () => 	{
				const data = await TVService.getTVShowsByType(type);
				setTVShows(data.results);
			};
			fetchTVShows();
		}, [i18n.language, type])
		return (
				<>
					<SideBarFilter type={type}/>
					<div className="flex-1 w-full min-w-0">
						<MediaGrid items={tvShows} type="tv"/>
					</div>
				</>
		);
	};