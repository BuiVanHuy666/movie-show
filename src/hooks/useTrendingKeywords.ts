import { useState, useEffect } from "react";
import { SearchService } from "@/services/searchService.ts";
import { useTranslation } from "react-i18next";
import type { Keyword } from "@/types/trendingKeywords.ts";

interface TrendingKeywordsState {
	keywords: string[];
	isLoading: boolean;
	error: string | null;
}

export const useTrendingKeywords = (
		timeWindow: "day" | "week" = "day",
		limit: number = 10
): TrendingKeywordsState => {
	const [keywords, setKeywords] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const {i18n} = useTranslation();

	useEffect(() => {
		let isMounted = true;

		const fetchKeywords = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const data = await SearchService.getTrendingKeywords(timeWindow);

				if (isMounted && data?.results) {
					const parsedResults = data.results
							.map((item: Keyword) => item.title || item.name)
							.filter((text): text is string => Boolean(text))
							.slice(0, limit);

					setKeywords(parsedResults);
				}
			} catch (err) {
				if (isMounted) {
					console.error("Failed to fetch trending keywords:", err);
					setError("Failed to fetch trending keywords");
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchKeywords();

		return () => {
			isMounted = false;
		};
	}, [timeWindow, limit, i18n.language]);

	return { keywords, isLoading, error };
};