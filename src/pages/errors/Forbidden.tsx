import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ErrorState } from "@/components/common/ErrorState";

export const Forbidden = () => {
	const { t } = useTranslation();

	return (
			<ErrorState
					statusCode="403"
					title={t("error.403.title")}
					description={t("error.403.desc")}
					icon={<ShieldAlert className="w-12 h-12 text-destructive" />}
			/>
	);
};