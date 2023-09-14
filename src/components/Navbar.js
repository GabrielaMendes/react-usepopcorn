import { Search } from "./Search";

export function Navbar({ numberOfMovies }) {
	return (
		<nav className="nav-bar">
			<Logo />
			<Search />
			<NumResults numberOfMovies={numberOfMovies} />
		</nav>
	);
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function NumResults({ numberOfMovies }) {
	return (
		<p className="num-results">
			Found <strong>{numberOfMovies}</strong> results
		</p>
	);
}
