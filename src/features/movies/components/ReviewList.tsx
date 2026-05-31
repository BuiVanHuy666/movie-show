import { useTranslation } from "react-i18next";
import { getAvatarUrl } from "@/utils/movieUtils.ts";
import { Star } from "lucide-react";
import type { Review } from "@/types/common.ts";

export const ReviewsList = ({reviews}: { reviews: Review[]
}) =>
	{
		const {t, i18n} = useTranslation();

		if (!reviews || reviews.length === 0) return null;

		return (
				<div className="mt-8 pt-8 border-t border-border w-full overflow-hidden">
					<h3 className="text-xl font-bold text-foreground mb-6">
						{t("movieDetails.reviews")}
						<span className="text-muted-foreground text-base font-normal"> ({reviews.length})</span>
					</h3>
					<div className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
						{reviews.map((review) =>
						{
							const avatar = getAvatarUrl(review.author_details.avatar_path);
							return (
									<div
											key={review.id}
											className="min-w-87.5 w-87.5 shrink-0 group cursor-pointer bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
									>
										<div className="flex items-center gap-4 mb-4">
											{avatar ? (
													<img
															src={avatar}
															alt={review.author}
															className="w-12 h-12 rounded-full object-cover bg-muted"
													/>
											) : (
													<div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-500 flex items-center justify-center font-bold text-lg">
														{review.author.charAt(0).toUpperCase()}
													</div>
											)}
											<div>
												<p className="font-bold text-foreground truncate w-48">
													{t("movieDetails.reviewBy")} {review.author}
												</p>
												<div className="flex items-center gap-2 mt-1">
													{review.author_details.rating && (
															<span className="flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-md text-xs font-semibold text-secondary-foreground">
												<Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/>
																{Number(review.author_details.rating).toFixed(1)}
											</span>
													)}
													<span className="text-xs text-muted-foreground">
											{new Date(review.created_at).toLocaleDateString(
													i18n.language === "vi" ? "vi-VN" : "en-US",
													{
														month: "short",
														day: "numeric",
														year: "numeric"
													}
											)}
										</span>
												</div>
											</div>
										</div>
										<p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-border pl-4 h-32 overflow-y-auto custom-scrollbar">
											{review.content}
										</p>
									</div>
							);
						})}
					</div>
				</div>
		);
	};