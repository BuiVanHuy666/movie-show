import { useTranslation } from "react-i18next";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const CustomPagination = ({ currentPage, totalPages, onPageChange }: CustomPaginationProps) => {
	const { t } = useTranslation();

	if (totalPages <= 1) return null;

	const items = [];
	let startPage = Math.max(1, currentPage - 2);
	let endPage = Math.min(totalPages, currentPage + 2);

	if (currentPage <= 3) endPage = Math.min(totalPages, 5);
	if (currentPage >= totalPages - 2) startPage = Math.max(1, totalPages - 4);

	for (let i = startPage; i <= endPage; i++) {
		items.push(
				<PaginationItem key={i}>
					<PaginationLink
							isActive={currentPage === i}
							onClick={() => onPageChange(i)}
							className="cursor-pointer select-none"
					>
						{i}
					</PaginationLink>
				</PaginationItem>
		);
	}

	if (endPage < totalPages) {
		items.push(
				<PaginationItem key="ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
		);
	}

	return (
			<Pagination className="pt-8 pb-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
								text={t("pagination.previous")}
								onClick={() => onPageChange(Math.max(1, currentPage - 1))}
								className={currentPage === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer select-none"}
						/>
					</PaginationItem>

					{items}

					<PaginationItem>
						<PaginationNext
								text={t("pagination.next")}
								onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
								className={currentPage >= totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer select-none"}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
	);
};