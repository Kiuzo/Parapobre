import { useState, useEffect } from 'react';

const APIKEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const URL_API = 'https://api.themoviedb.org/3';

const GENRE_IDS = {
    action: 28,
    comedy: 35,
    drama: 18,
    horror: 27,
    romance: 10749,
    scifi: 878,
    animation: 16,
    documentary: 99,
    thriller: 53,
    adventure: 12
};

export function useMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Initialize favorites from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem('movieFavorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
        // Load initial popular movies
        getPopularMovies();
    }, []);

    const saveFavorites = (newFavorites) => {
        setFavorites(newFavorites);
        localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    const toggleFavorite = async (movie) => {
        const index = favorites.findIndex(fav => fav.id === movie.id);
        let newFavorites = [...favorites];

        if (index > -1) {
            // Remove
            newFavorites.splice(index, 1);
        } else {
            //add
            newFavorites.push(movie);
        }
        saveFavorites(newFavorites);
    };

    const getPopularMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_API}/movie/popular?api_key=${APIKEY}&language=en-US&page=1`);
            const data = await response.json();
            setMovies(data.results || []);
            setError(null);
        } catch (err) {
            console.error('Error loading movies:', err);
            setError('Error loading movies');
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async (query) => {
        if (!query || query.trim() === '') {
            getPopularMovies();
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${URL_API}/search/movie?api_key=${APIKEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
            const data = await response.json();
            setMovies(data.results || []);
            setError(null);
        } catch (err) {
            console.error('Error searching movies:', err);
            setError('Error searching movies');
        } finally {
            setLoading(false);
        }
    };

    const filterByGenre = async (genreKey) => {
        const genreId = GENRE_IDS[genreKey];
        if (!genreId) return;

        setLoading(true);
        try {
            const response = await fetch(`${URL_API}/discover/movie?api_key=${APIKEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=1`);
            const data = await response.json();
            setMovies(data.results || []);
            setError(null);
        } catch (err) {
            console.error('Error filtering by genre:', err);
            setError('Error filtering by genre');
        } finally {
            setLoading(false);
        }
    };

    // Helper to fetch full details if needed (e.g. for modal)
    const getMovieDetails = async (id) => {
        try {
            const res = await fetch(`${URL_API}/movie/${id}?api_key=${APIKEY}&language=en-US`);
            return await res.json();
        } catch (err) {
            console.error('Error getting movie details:', err);
            return null;
        }
    };

    return {
        movies,
        loading,
        error,
        favorites,
        searchMovies,
        filterByGenre,
        toggleFavorite,
        isFavorite,
        getPopularMovies,
        getMovieDetails
    };
}
