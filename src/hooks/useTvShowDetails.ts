import { useState, useEffect } from "react";
import { TVService } from "@/services/mediaService.ts";
import type { TVDetails } from "@/types/tvShow.ts";

export const useTvShowDetails = (tvId: string | undefined, language: string) => {
	const [tvShow, setTvShow] = useState<TVDetails | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(!!tvId);

	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!tvId) return;

		const fetchTVData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await TVService.getDetails(
						parseInt(tvId),
						"&append_to_response=aggregate_credits,external_ids,similar,recommendations,videos,keywords,content_ratings"
				);
				setTvShow(data);
			} catch (err) {
				console.error("Error when fetch TV show detail:", err);

				if (err instanceof Error) {
					setError(err);
				} else {
					setError(new Error("Đã xảy ra lỗi không xác định"));
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchTVData();
	}, [tvId, language]);

	return { tvShow, isLoading, error };
};