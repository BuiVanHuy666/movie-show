import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SearchType } from "@/types/common.ts";

interface SearchSidebarProps {
	activeTab: SearchType;
	setActiveTab: (tab: SearchType) => void;
	counts: { movie: number; tv: number; person: number };
	setPage: (page: number) => void;
}

export const Sidebar = ({ activeTab, setActiveTab, counts, setPage }: SearchSidebarProps) => {
	const { t } = useTranslation();

	const categories: { key: SearchType; label: string; count: number }[] = [
		{ key: "movie", label: "search.sidebar.movie", count: counts.movie },
		{ key: "tv", label: "search.sidebar.tv", count: counts.tv },
		{ key: "person", label: "search.sidebar.person", count: counts.person },
	];

	return (
			<div className="w-full md:w-64 shrink-0 flex flex-col gap-4 sticky top-37.5">
				<Card className="rounded-xl overflow-hidden border-border shadow-sm p-0">
					<div className="bg-sky-500 p-4 text-white font-bold text-lg">
						{t("search.title")}
					</div>
					<div className="flex flex-col p-2 gap-1">
						{categories.map((cat) => (
								<Button
										key={cat.key}
										variant={activeTab === cat.key ? "secondary" : "ghost"}
										className={`w-full justify-between px-4 py-6 font-normal ${
												activeTab === cat.key ? "font-bold bg-accent" : "hover:bg-muted/50"
										}`}
										onClick={() => {
											setActiveTab(cat.key);
											setPage(1);
										}}
								>
									<span className="text-base">{t(cat.label)}</span>
									<Badge variant={activeTab === cat.key ? "default" : "secondary"} className="ml-auto rounded-full px-2.5">
										{cat.count.toLocaleString()}
									</Badge>
								</Button>
						))}
					</div>
				</Card>

				<div className="flex items-start gap-2 px-2 text-muted-foreground text-sm leading-relaxed italic">
					<Info className="w-4 h-4 shrink-0 mt-0.5" />
					<p>{t("search.sidebar.hint")}</p>
				</div>
			</div>
	);
};