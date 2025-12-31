import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

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
    const { user } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Initialize favorites from Supabase
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                setFavorites([]);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('favorites')
                    .select('movie_data')
                    .eq('user_id', user.id);

                if (error) throw error;
                if (data) {
                    setFavorites(data.map(item => item.movie_data));
                }
            } catch (err) {
                console.error('Error fetching favorites:', err);
            }
        };

        fetchFavorites();
        getPopularMovies();
    }, [user]);

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    };

    const toggleFavorite = async (movie) => {
        if (!user) return;

        const isFav = isFavorite(movie.id);

        try {
            if (isFav) {
                // Remove
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('movie_id', movie.id);

                if (error) throw error;
                setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
            } else {
                // Add
                const { error } = await supabase
                    .from('favorites')
                    .insert({
                        user_id: user.id,
                        movie_id: movie.id,
                        movie_data: movie
                    });

                if (error) throw error;
                setFavorites(prev => [...prev, movie]);
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
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
