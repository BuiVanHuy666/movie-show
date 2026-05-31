import { useEffect, useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useTranslation } from "react-i18next";
import type { Genre } from "@/types/common.ts";
import { getGenres } from "@/services/genresService.ts";

const DEFAULT_FILTERS = {
	allReleases: true,
	fromDate: "",
	toDate: "2026-11-29",
	language: "",
	userScore: [0, 10],
	minUserVotes: [0],
	runtime: [0, 360],
};

export const SideBarFilter = ({type}: {type: string}) => {
	const { t, i18n } = useTranslation();
	const [genes, setGenes] = useState<Genre[]>([]);

	const [isOpen, setIsOpen] = useState(true);

	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [allReleases, setAllReleases] = useState(DEFAULT_FILTERS.allReleases);
	const [fromDate, setFromDate] = useState(DEFAULT_FILTERS.fromDate);
	const [toDate, setToDate] = useState(DEFAULT_FILTERS.toDate);
	const [language, setLanguage] = useState(DEFAULT_FILTERS.language);
	const [userScore, setUserScore] = useState(DEFAULT_FILTERS.userScore);
	const [minUserVotes, setMinUserVotes] = useState(DEFAULT_FILTERS.minUserVotes);
	const [runtime, setRuntime] = useState(DEFAULT_FILTERS.runtime);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const data = await getGenres(type);
				setGenes(data);
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};
		fetchGenres();
	}, [i18n.language, type]);

	const isChanged =
			selectedGenres.length > 0 ||
			allReleases !== DEFAULT_FILTERS.allReleases ||
			fromDate !== DEFAULT_FILTERS.fromDate ||
			toDate !== DEFAULT_FILTERS.toDate ||
			language !== DEFAULT_FILTERS.language ||
			userScore[0] !== DEFAULT_FILTERS.userScore[0] || userScore[1] !== DEFAULT_FILTERS.userScore[1] ||
			minUserVotes[0] !== DEFAULT_FILTERS.minUserVotes[0] ||
			runtime[0] !== DEFAULT_FILTERS.runtime[0] || runtime[1] !== DEFAULT_FILTERS.runtime[1];

	const toggleGenre = (genreId: number) => {
		setSelectedGenres(prev =>
				prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
		);
	};

	return (
			<div className="w-full md:w-65 shrink-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
				<button
						onClick={() => setIsOpen(!isOpen)}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border"
				>
					<span className="font-bold text-base text-foreground">{t("movieFilter.title")}</span>
					<ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
				</button>

				{isOpen && (
						<div className="flex flex-col animate-in fade-in duration-200">
							<div className="p-4 space-y-3">
								<span className="text-sm font-semibold text-foreground">{t("movieFilter.releaseDates")}</span>
								<div className="flex items-center space-x-2">
									<Checkbox
											id="all-releases"
											checked={allReleases}
											onCheckedChange={(checked) => setAllReleases(!!checked)}
									/>
									<Label htmlFor="all-releases" className="font-normal text-muted-foreground cursor-pointer select-none">
										{t("movieFilter.searchAllReleases")}
									</Label>
								</div>
								<div className="grid grid-cols-[40px_1fr] items-center gap-2 pt-1">
									<span className="text-xs text-muted-foreground">{t("movieFilter.from")}</span>
									<Input
											type="date"
											className="h-8 text-xs"
											value={fromDate}
											onChange={(e) => setFromDate(e.target.value)}
									/>
								</div>
								<div className="grid grid-cols-[40px_1fr] items-center gap-2">
									<span className="text-xs text-muted-foreground">{t("movieFilter.to")}</span>
									<Input
											type="date"
											className="h-8 text-xs"
											value={toDate}
											onChange={(e) => setToDate(e.target.value)}
									/>
								</div>
							</div>

							<Separator />

							<div className="p-4 space-y-3">
								<span className="text-sm font-semibold text-foreground">{t("movieFilter.genres")}</span>
								<div className="flex flex-wrap gap-2">
									{genes.map(genre => {
										const isSelected = selectedGenres.includes(genre.id);
										return (
												<Badge
														key={genre.id}
														variant={isSelected ? "default" : "outline"}
														className={`rounded-full px-3 py-1 font-normal cursor-pointer transition-colors ${
																isSelected ? "bg-sky-500 hover:bg-sky-600 text-white border-sky-500" : "hover:bg-muted"
														}`}
														onClick={() => toggleGenre(genre.id)}
												>
													{genre.name}
												</Badge>
										);
									})}
								</div>
							</div>

							<Separator />

							<div className="p-4 space-y-2">
								<div className="flex items-center gap-1.5">
									<span className="text-sm font-semibold text-foreground">{t("movieFilter.language")}</span>
									<HelpCircle className="w-3.5 h-3.5 text-muted-foreground/70"/>
								</div>
								<Select value={language} onValueChange={setLanguage}>
									<SelectTrigger className="w-full h-8 text-xs">
										<SelectValue placeholder={t("movieFilter.noneSelected")}/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="vi">Vietnamese</SelectItem>
										<SelectItem value="ko">Korean</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Separator />

							<div className="p-4 space-y-6">
								<div className="space-y-3">
									<span className="text-sm font-semibold text-foreground">{t("movieFilter.userScore")}</span>
									<Slider
											value={userScore}
											onValueChange={setUserScore}
											max={10}
											step={1}
											className="py-2"
									/>
									<div className="flex justify-between text-[10px] text-muted-foreground font-medium">
										<span>0</span><span>5</span><span>10</span>
									</div>
								</div>

								<div className="space-y-3">
									<span className="text-sm font-semibold text-foreground">{t("movieFilter.minUserVotes")}</span>
									<Slider
											value={minUserVotes}
											onValueChange={setMinUserVotes}
											max={500}
											step={50}
											className="py-2"
									/>
									<div className="flex justify-between text-[10px] text-muted-foreground font-medium">
										<span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span>
									</div>
								</div>

								<div className="space-y-3">
									<span className="text-sm font-semibold text-foreground">{t("movieFilter.runtime")}</span>
									<Slider
											value={runtime}
											onValueChange={setRuntime}
											max={360}
											step={15}
											className="py-2"
									/>
									<div className="flex justify-between text-[10px] text-muted-foreground font-medium">
										<span>0</span><span>120</span><span>240</span><span>360</span>
									</div>
								</div>
							</div>
						</div>
				)}

				<div className="p-4 border-t border-border bg-card mt-auto">
					<Button
							disabled={!isChanged}
							className={`w-full rounded-full font-bold h-10 shadow-none transition-all duration-200 ${
									isChanged
											? "bg-sky-500 hover:bg-sky-600 text-white cursor-pointer shadow-xs"
											: "bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground cursor-not-allowed opacity-60"
							}`}
					>
						{t("movieFilter.search")}
					</Button>
				</div>
			</div>
	);
};