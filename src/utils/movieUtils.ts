export const formatRuntime = (minutes: number | null, t: (key: string) => string) =>
	{
		if (!minutes) return t("movieDetails.notApplicable");
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return `${h}h ${m}m`;
	};

export const formatCurrency = (amount: number, fallbackText: string) =>
	{
		if (!amount || amount === 0) return fallbackText;
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};

export const getAvatarUrl = (path: string | null): string | null =>
	{
		if (!path) return null;
		if (path.startsWith("/https")) return path.substring(1);
		return `https://image.tmdb.org/t/p/w150_and_h150_face${path}`;
	};

export const getLanguageName = (langCode: string, locale: string): string =>
	{
		try {
			const displayNames = new Intl.DisplayNames([locale], {type: "language"});
			return displayNames.of(langCode) || langCode;
		} catch {
			return langCode.toUpperCase();
		}
	};
