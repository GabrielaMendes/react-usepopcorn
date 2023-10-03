import { useEffect } from "react";

export function useKey(key, callback) {
	useEffect(() => {
		const action = (e) => {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				callback();
			}
		};
		document.addEventListener("keydown", action);

		return () => document.removeEventListener("keydown", action);
	}, [key, callback]);
}
