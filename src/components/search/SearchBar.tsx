import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
	inputValue: string;
	setInputValue: (val: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ inputValue, setInputValue, onSubmit }: SearchBarProps) => {
	const { t } = useTranslation();

	return (
			<div className="border-b bg-card sticky top-16 z-40 shadow-sm">
				<div className="container mx-auto px-4 py-2">
					<form onSubmit={onSubmit} className="relative max-w-5xl mx-auto flex items-center">
						<Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
						<Input
								className="pl-11 h-12 rounded-full border-muted bg-muted/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-sky-500 text-base"
								placeholder={t("nav.search.placeholder")}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
						/>
					</form>
				</div>
			</div>
	);
};