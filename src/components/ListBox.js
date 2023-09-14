import { useState } from "react";
import { ToggleOpenBtn } from "./ToggleOpenBtn";
import { MovieList } from "./MovieList";

export function ListBox({ movies }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<ToggleOpenBtn
				isOpen={isOpen}
				onToggleOpen={() => setIsOpen((open) => !open)}
			/>
			{isOpen && <MovieList movies={movies} />}
		</div>
	);
}
