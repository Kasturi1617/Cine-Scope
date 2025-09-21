import "../css/favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorite() {
    const { favorites } = useMovieContext();
    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>)
    }

    return (<div className="favorites-empty">
        <h2>No favorite movies yet</h2>
        <p>Start adding movies to your favorites list and they will appear here</p>
    </div>)
}

export default Favorite;
