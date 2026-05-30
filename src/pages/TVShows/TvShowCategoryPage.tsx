import { SideBarFilter } from "@/components/common/SideBarFilter.tsx";
import { MediaGrid } from "@/components/common/MediaGrid.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const TvShowCategoryPage = ({type}: {
	type: string
}) =>
	{
		const {i18n} = useTranslation();
		const [tvShows, setTVShows] = useState<TVShows[]>([]);

		useEffect(() => {
			const fetchTVShows = async () => 	{
				const data = await getTVShows(type);
				setTVShows(data.results);
			};
			fetchTVShows();
		}, [i18n.language, type])
		return (
				<>
					<SideBarFilter type={type}/>
					<div className="flex-1 w-full min-w-0">
						<MediaGrid items={movies} type={type}/>
					</div>
				</>
		);
	};