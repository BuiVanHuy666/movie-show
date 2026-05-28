import { useTranslation } from "react-i18next";

export const ScoreCircle = ({score}: { score: number }) =>
	{
		const {t} = useTranslation();
		const radius = 26;
		const circumference = 2 * Math.PI * radius;
		const strokeDashoffset = circumference - (score / 100) * circumference;

		const scoreColor =
				score >= 70 ? "text-emerald-500"
						: score >= 40 ? "text-yellow-500"
								: "text-red-500";
		const trackColor =
				score >= 70 ? "text-emerald-950"
						: score >= 40 ? "text-yellow-950"
								: "text-red-950";

		return (
				<div className="flex items-center gap-3">
					<div className="relative w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg shrink-0">
						<svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
							<circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className={trackColor}/>
							<circle
									cx="32" cy="32" r={radius}
									stroke="currentColor" strokeWidth="4" fill="transparent"
									strokeDasharray={circumference}
									strokeDashoffset={strokeDashoffset}
									strokeLinecap="round"
									className={`${scoreColor} transition-all duration-1000 ease-out`}
							/>
						</svg>
						<span className="text-xl font-bold relative z-10 text-white">
					{score > 0 ? <>{score}<span className="text-xs font-normal">%</span></> : "NR"}
				</span>
					</div>
					<span className="font-bold text-sm leading-tight max-w-12.5">{t("movieDetails.userScore")}</span>
				</div>
		);
	};