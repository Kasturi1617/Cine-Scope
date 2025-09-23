import React from "react";
import ReactDOM from "react-dom";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favorite = isFavorite(movie.id);
    const navigate = useNavigate();

    function handleFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation(); // to stop propagating the event to its parent component
        if(favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    function handleCardClick()
    {
        navigate(`/movie/${movie.id}`)
    }

    return(
    <div className="movie-card" onClick={handleCardClick}>
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-hover-overlay">
                <h3>{movie.title}</h3>
                <p className="release-year">{movie.release_date?.split("-")[0]}</p>
                <p className="rating">⭐{movie.vote_average?.toFixed(1)}</p>
                <p className="overview">{movie.overview?.slice(0, 120)}...</p>
            </div>
            
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={handleFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        {/* <div className="movie-info">
            <h3>{movie.title}</h3>
            <p> {movie.release_date?.split("-")[0]}</p>
        </div> */}
    </div>)
}

export default MovieCard;

// context allows state to be globally available to anything thats within the provied context