import { FileQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ErrorState } from "@/components/common/ErrorState";

export const NotFound = () => {
	const { t } = useTranslation();

	return (
			<ErrorState
					statusCode="404"
					title={t("error.404.title", "Không tìm thấy trang")}
					description={t("error.404.desc", "Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không thể truy cập.")}
					icon={<FileQuestion className="w-12 h-12" />}
			/>
	);
};