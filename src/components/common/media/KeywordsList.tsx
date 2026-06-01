import { Badge } from "@/components/ui/badge.tsx";
import { useTranslation } from "react-i18next";
import type { Keyword } from "@/types/common.ts";

interface KeywordsListProps {
	keywords?: Keyword[];
}

export const KeywordsList = ({ keywords }: KeywordsListProps) => {
	const { t } = useTranslation();

	return (
			<div>
				<p className="font-bold text-sm mb-2">{t("tvDetails.keywords")}</p>
				<div className="flex flex-wrap gap-2">
					{keywords && keywords.length > 0 ? (
							keywords.map(kw => (
									<Badge key={kw.id} variant="secondary" className="font-normal bg-muted text-xs">
										{kw.name}
									</Badge>
							))
					) : (
							<span className="text-sm text-muted-foreground">{t("tvDetails.noKeywords")}</span>
					)}
				</div>
			</div>
	);
};