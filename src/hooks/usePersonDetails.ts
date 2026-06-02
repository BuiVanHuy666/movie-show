import { useState, useEffect } from "react";
import { PersonService } from "@/services/mediaService.ts";
import type { PersonDetails } from "@/types/person.ts";

export const usePersonDetail = (personId: string | undefined, language: string) => {
	const [person, setPerson] = useState<PersonDetails | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(!!personId);

	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!personId) {
			return;
		}

		const fetchPersonData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const data = await PersonService.getDetails(
						parseInt(personId),
						"&append_to_response=combined_credits,external_ids"
				);
				setPerson(data);
			} catch (err) {
				console.error("Error when fetching person details:", err);

				if (err instanceof Error) {
					setError(err);
				} else {
					setError(new Error("Đã xảy ra lỗi không xác định"));
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchPersonData();
	}, [personId, language]);

	return { person, isLoading, error };
};