import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import "../css/Home.css";
import "../services/api";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies :(");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []); //Empty dependency array means, run once when rendered on screen

    const handleSearch = async (event) => {
        event.preventDefault(); //stop the form from refreshing the page
        //trim removes all leading and trailing spaces
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
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
        setSearchQuery("");
    }

    function handleSearchChange(event) {
        const value = event.target.value;
        setSearchQuery(value);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={handleSearchChange} />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div childrenlassName="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>}
        </div>
    );
}

export default Home;