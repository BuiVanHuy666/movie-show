import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertTriangle, ServerCrash } from "lucide-react";
import { ErrorState } from "@/components/common/ErrorState";
import { NotFound } from "@/pages/errors/NotFound.tsx";
import { useTranslation } from "react-i18next";

export const RootErrorBoundary = () => {
	const error = useRouteError();
	const { t } = useTranslation();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <NotFound />;
		}

		return (
				<ErrorState
						statusCode={error.status}
						title={error.statusText || t("error.system.title")}
						description={error.data?.message || t("error.system.desc")}
						icon={<AlertTriangle className="w-12 h-12 text-yellow-500" />}
				/>
		);
	}

	return (
			<ErrorState
					statusCode="500"
					title={t("error.500.title")}
					description={t("error.500.desc")}
					icon={<ServerCrash className="w-12 h-12 text-destructive" />}
			/>
	);
};