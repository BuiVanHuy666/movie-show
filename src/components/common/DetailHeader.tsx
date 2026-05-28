import { useNavigate } from "react-router-dom";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/app/providers/theme-provider.tsx";
import { useCallback } from "react";

export const DetailHeader = () =>
	{
		const navigate = useNavigate();
		const { t, i18n } = useTranslation();
		const { theme, setTheme } = useTheme();

		const toggleLanguage = useCallback(() => {
			i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
		}, [i18n]);
		return (
				<div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
					<div className="container px-4 mx-auto py-3 flex items-center justify-between">
						<button
								onClick={() => navigate(-1)}
								className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<ChevronLeft className="w-5 h-5"/>
							<span className="font-medium">{t("movieDetails.back")}</span>
						</button>

						<div className="flex items-center gap-4 shrink-0">
							<button
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									className="flex items-center justify-center w-10 h-10 transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
							>
								{theme === "dark" ?
										<Sun className="w-5 h-5"/> :
										<Moon className="w-5 h-5"/>}
							</button>
							<button
									onClick={toggleLanguage}
									className="flex items-center justify-center w-10 h-10 text-sm font-bold transition-colors border rounded-md text-muted-foreground border-border hover:bg-accent"
							>
								{i18n.language === "vi" ? "VI" : "EN"}
							</button>
						</div>
					</div>
				</div>
		);
	};