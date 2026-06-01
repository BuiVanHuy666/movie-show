import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SearchSkeleton = () => (
		<div className="space-y-4">
			{[1, 2, 3, 4, 5].map((i) => (
					<Card key={i} className="flex flex-row overflow-hidden border-border h-33.75">
						<Skeleton className="w-22.5 h-full rounded-none shrink-0" />
						<div className="flex-1 p-4 flex flex-col justify-center gap-3">
							<Skeleton className="h-6 w-2/4" />
							<Skeleton className="h-4 w-1/4" />
							<div className="space-y-2 mt-2">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-5/6" />
							</div>
						</div>
					</Card>
			))}
		</div>
);