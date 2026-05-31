import i18n from "@/lib/i18n.ts";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const getTMDBLanguage = (): string =>
	{
		return i18n.language === "vi" ? "vi-VN" : "en-US";
	};

const request = async <T>(method: string, endpoint: string, params: string = "", language?: string): Promise<T> =>
	{
		const lang = language || getTMDBLanguage();
		const langQuery = lang ? `&language=${lang}` : "";
		const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}${langQuery}`;

		const response = await fetch(url, {
			method,
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			throw {
				status: response.status,
				message: response.statusText,
				url
			};
		}

		return await response.json();
	};

const api = {
	get: <T>(endpoint: string, params?: string, language?: string) => request<T>("GET", endpoint, params, language),
};

export default api;