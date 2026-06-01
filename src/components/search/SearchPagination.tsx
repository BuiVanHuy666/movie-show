import {
	Pagination, PaginationContent, PaginationEllipsis,
	PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";

interface SearchPaginationProps {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
}

export const SearchPagination = ({ page, setPage, totalPages }: SearchPaginationProps) => {
	const { t } = useTranslation();

	if (totalPages <= 1) return null;

	const generatePageItems = () => {
		const items = [];
		let startPage = Math.max(1, page - 1);
		let endPage = Math.min(totalPages, page + 1);

		if (page === 1) endPage = Math.min(totalPages, 3);
		if (page === totalPages) startPage = Math.max(1, totalPages - 2);

		for (let i = startPage; i <= endPage; i++) {
			items.push(
					<PaginationItem key={i}>
						<PaginationLink isActive={page === i} onClick={() => setPage(i)} className="cursor-pointer">
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

		return items;
	};

	return (
			<Pagination className="pt-8 pb-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
								text={t("pagination.previous")}
								onClick={() => setPage(p => Math.max(1, p - 1))}
								className={page === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"}
						/>
					</PaginationItem>
					{generatePageItems()}
					<PaginationItem>
						<PaginationNext
								text={t("pagination.next")}
								onClick={() => setPage(p => Math.min(totalPages, p + 1))}
								className={page >= totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
	);
};