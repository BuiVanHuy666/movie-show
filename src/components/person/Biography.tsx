import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Biography = ({ name, biography }: { name: string; biography: string }) => {
	const { t } = useTranslation();
	const [isBioExpanded, setIsBioExpanded] = useState(false);
	const [isBioOverflowing, setIsBioOverflowing] = useState(false);
	const bioRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (bioRef.current) {
			const lineHeight = 24;
			const maxHeight = lineHeight * 6;
			if (bioRef.current.scrollHeight > maxHeight) {
				setIsBioOverflowing(true);
			}
		}
	}, [biography]);

	return (
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight text-foreground">{name}</h1>
				<div className="space-y-2">
					<h3 className="font-bold text-xl">{t("actorDetails.biography", "Biography")}</h3>
					<p ref={bioRef} className={`text-base text-muted-foreground leading-relaxed whitespace-pre-wrap transition-all duration-300 ${!isBioExpanded ? "line-clamp-6" : ""}`}>
						{biography || t("actorDetails.noBiography", "We don't have a biography for this person.")}
					</p>

					{isBioOverflowing && (
							<button onClick={() => setIsBioExpanded(!isBioExpanded)} className="mt-1 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors">
								{isBioExpanded ? t("showLess") : t("showMore")}
							</button>
					)}
				</div>
			</div>
	);
};