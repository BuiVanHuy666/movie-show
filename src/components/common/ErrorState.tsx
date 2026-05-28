import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/app/routes/routes.ts";

interface ErrorStateProps {
	statusCode: string | number;
	title: string;
	description: string;
	icon?: React.ReactNode;
}

export const ErrorState = ({ statusCode, title, description, icon }: ErrorStateProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
			<div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
				<div className="absolute flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.02]">
					<h1 className="text-[25vw] font-black">{statusCode}</h1>
				</div>

				<div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
					{icon && (
							<div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4 shadow-sm border border-border">
								{icon}
							</div>
					)}

					<div className="space-y-3">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							{title}
						</h2>
						<p className="text-muted-foreground text-base md:text-lg">
							{description}
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
						<Button
								variant="outline"
								size="lg"
								onClick={() => navigate(-1)}
								className="w-full sm:w-auto gap-2 border-border text-muted-foreground hover:text-foreground"
						>
							<ChevronLeft className="w-4 h-4" />
							{t("error.goBack")}
						</Button>
						<Button
								variant="default"
								size="lg"
								onClick={() => navigate(PATHS.HOME)}
								className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
						>
							<Home className="w-4 h-4" />
							{t("error.goHome")}
						</Button>
					</div>
				</div>
			</div>
	);
};