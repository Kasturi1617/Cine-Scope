import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import MovieDetail from "../components/MovieDetail";

function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Page should scroll to top at loading time
        const loadMovieDetails = async () => {
            try {
                const popularMovies = await getMovieDetails(id);
                setMovie(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movie :(");
            } finally {
                setLoading(false);
            }
        }
        loadMovieDetails();
    }, []);

    return (
        <div>
            {error && <div childrenlassName="error-message">{error}</div>}
            {loading && <div className="loading">Loading...</div>}
            <MovieDetail movie={movie}/>
        
        </div>
    )
}
export default MovieDetailsPage;
