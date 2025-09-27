import MovieCard from "../components/MovieCard"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import "../css/Home.css";
import "../services/api";
import { searchMovies } from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const loadSearchMovies = async () => {
            setSearchQuery(query);
            try {
                const movieList = await searchMovies(query);
                setMovies(movieList);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies :(");
            } finally {
                setLoading(false);
            }
        }
        loadSearchMovies();
    }, [query]); // Empty dependency array means, run once when rendered on screen


    const handleSearch = async (event) => {
        event.preventDefault(); // stop the form from refreshing the page
        if (!searchQuery.trim()) return; // trim removes all leading and trailing spaces
        setLoading(true);
        navigate(`/search/${searchQuery}`);
    }

    function handleSearchChange(event) {
        const value = event.target.value;
        setSearchQuery(value);
    }


    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={handleSearchChange} />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        movie.title.toLowerCase().startsWith(query.toLowerCase()) &&
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>}
        </div>
    );
}

export default SearchPage;