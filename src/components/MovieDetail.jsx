import React from "react";
import "../css/MovieDetail.css";

function MovieDetail({ movie }) {
  if (!movie) return <div>Loading...</div>;

  const trailer = movie?.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <div className="movie-detail">
      {/* Backdrop + overlay for title and overview */}
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="movie-overlay">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div className="movie-trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Cast */}
      <h3 className="cast-title">Top Cast</h3>
      <ul className="cast-list">
        {movie.credits?.cast.slice(0, 5).map((actor) => (
          <li key={actor.id} className="cast-item">
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <p>{actor.name}</p>
            <small>as {actor.character}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
