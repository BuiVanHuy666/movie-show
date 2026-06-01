import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PATHS } from "@/app/routes/routes.ts";

interface CreditHistoryItem {
	id: number;
	credit_id: string;
	release_year: string;
	title?: string;
	name?: string;
	media_type?: string;
	character?: string;
	job?: string;
}

interface CreditHistoryProps {
	title: string;
	history: CreditHistoryItem[];
	roleType: "acting" | "production";
}

export const CreditHistory = ({ title, history, roleType }: CreditHistoryProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);

	if (!history || history.length === 0) return null;

	const visibleHistory = isExpanded ? history : history.slice(0, 8);

	return (
			<div className="space-y-4">
				<h3 className="font-bold text-xl">{title}</h3>
				<Card className="shadow-sm border-border overflow-hidden">
					{visibleHistory.map((credit, index) => {
						const mediaTitle = credit.title || credit.name;
						const specificRole = roleType === "acting" ? credit.character : credit.job;

						return (
								<div key={credit.credit_id + (roleType === "production" ? index : "")} className="flex gap-4 p-4 border-b border-border last:border-none hover:bg-muted/50 transition-colors">
									<div className="w-12 shrink-0 font-medium text-center text-muted-foreground">{credit.release_year || "—"}</div>
									<div className="flex flex-col items-center">
										<div className="w-2 h-2 rounded-full bg-border mt-2" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-bold cursor-pointer hover:text-sky-500 transition-colors inline-block truncate max-w-full" onClick={() => navigate(credit.media_type === "tv" ? PATHS.TV.DETAIL(credit.id) : PATHS.MOVIES.DETAIL(credit.id))}>
											{mediaTitle}
										</p>
										{specificRole && (
												<p className="text-sm text-muted-foreground mt-0.5">
													as <span className="text-foreground font-medium">{specificRole}</span>
												</p>
										)}
									</div>
								</div>
						);
					})}

					{history.length > 8 && (
							<div className="p-2 border-t border-border bg-muted/30">
								<Button variant="ghost" className="w-full text-sky-500 hover:text-sky-600 font-semibold" onClick={() => setIsExpanded(!isExpanded)}>
									{isExpanded ? t("showLess", "Collapse") : t("showMore", { count: history.length - 8 })}
								</Button>
							</div>
					)}
				</Card>
			</div>
	);
};