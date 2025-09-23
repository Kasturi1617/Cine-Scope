import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]); // keep a copy of popular movies
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false); // track if user is searching

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setPopularMovies(popularMovies); // save popular movies separately
            } catch (err) {
                console.log(err);
                setError("Failed to load movies :(");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []); // Empty dependency array means, run once when rendered on screen

    const handleSearch = async (event) => {
        event.preventDefault(); // stop the form from refreshing the page
        if (!searchQuery.trim()) return; // trim removes all leading and trailing spaces
        setLoading(true);
        setIsSearching(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    }

    function handleSearchChange(event) {
        const value = event.target.value;
        setSearchQuery(value);
    }

    function handleClearSearch() {
        setSearchQuery("");
        setMovies(popularMovies); // restore popular movies
        setIsSearching(false);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies"
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="search-button">Search</button>
                {isSearching && (
                    <button type="button" className="clear-button" onClick={handleClearSearch}>
                        Back to Home
                    </button>
                )}
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>}
        </div>
    );
}

export default Home;
