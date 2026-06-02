import { useEffect } from "react";

export function useDocumentTitle(title: string, retainOnUnmount: boolean = false) {
	useEffect(() => {
		const defaultTitle = document.title;
		document.title = title ? `${title} | The MovieShow` : "The MovieShow";

		return () => {
			if (!retainOnUnmount) {
				document.title = defaultTitle;
			}
		};
	}, [title, retainOnUnmount]);
}