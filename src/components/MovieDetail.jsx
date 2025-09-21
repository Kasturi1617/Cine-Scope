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

  const handlePlayClick = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    }
  };

  // Helper function to get star rating
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2); // Convert 10-point to 5-point scale
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="movie-detail">
      <div className="movie-hero">
        {/* Background image */}
        <div 
          className="movie-background"
          style={{ 
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none'
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="movie-overlay-bg"></div>
        
        {/* Content layer */}
        <div className="movie-content">
          {/* Logo/Brand - top left */}

          {/* Movie Title - main position */}
          <div className="movie-title-section">
            <h1 className="movie-title">{movie.title}</h1>
            
            {/* Rating and Meta Info */}
            <div className="movie-meta">
              <div className="rating-section">
                <span className="stars">{renderStars(movie.vote_average)}</span>
                <span className="rating-text">{movie.vote_average?.toFixed(1)}/10</span>
                <span className="rating-source">IMDb</span>
              </div>
              <span className="runtime">{movie.runtime ? `${movie.runtime}mins` : '2hr 22mins'}</span>
            </div>

            {/* Description */}
            <p className="movie-description">{movie.overview}</p>

            {/* Additional Info */}
            <div className="movie-info">
              <div className="info-row">
                <span className="info-label">Starring:</span>
                <span className="info-value">
                  {movie.credits?.cast.slice(0, 2).map(actor => actor.name).join(', ') || 'Karen Gilchrist, James Earl Jones'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Genres:</span>
                <span className="info-value">
                  {movie.genres?.map(genre => genre.name).join(', ') || 'Action'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Tags:</span>
                <span className="info-value">
                  {movie.genres?.map(genre => genre.name).join(', ') || 'Action, Adventure, Horror'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="play-now-button">
                ▶ PLAY NOW
              </button>
            </div>
          </div>

          {/* Watch Trailer Button - right side */}
          <div className="trailer-section">
            {trailer && (
              <button className="watch-trailer-button" onClick={handlePlayClick}>
                <div className="play-icon">▶</div>
                <span>WATCH TRAILER</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cast section */}
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
