import { useState } from "react";
import { ToggleOpenBtn } from "./ToggleOpenBtn";
import { WatchedList } from "./WatchedList";
import { tempWatchedData, } from "../App";

export function WatchedBox() {
	const [watched, setWatched] = useState(tempWatchedData);
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<ToggleOpenBtn
				isOpen={isOpen}
				onToggleOpen={() => setIsOpen((open) => !open)}
			/>

			{isOpen && (
				<>
					<WatchedSummary watched={watched} />
					<WatchedList watched={watched} />
				</>
			)}
		</div>
	);
}

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}
