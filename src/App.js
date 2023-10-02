import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const KEY = "52f216c1";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [watched, setWatched] = useState(() => {
		const storedValue = localStorage.getItem("watched");
		return storedValue ? JSON.parse(storedValue) : [];
	});

	const handleSelectMovie = (id) => {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	};

	const handleCloseMovie = () => {
		setSelectedId(null);
	};

	const handleAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	};

	const handleDeleteWatched = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};

	useEffect(() => {
		localStorage.setItem("watched", JSON.stringify(watched));
	}, [watched]);

	useEffect(() => {
		const controller = new AbortController();

		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!res.ok) {
					throw new Error("Something went wrong with fetching movies");
				}

				const data = await res.json();
				if (data.Response === "False") {
					throw new Error("Movie not found");
				}
				setMovies(data.Search);
				setError("");
			} catch (err) {
				if (err.name !== "AbortError") {
					console.log(err.message);
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		};
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}

		handleCloseMovie();
		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	return (
		<>
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<NumResults numberOfMovies={movies.length} />
			</Navbar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{error && <ErrorMessage message={error} />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							watched={watched}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
