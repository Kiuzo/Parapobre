import { useState, useEffect } from 'react';

const APIKEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const URL_API = 'https://api.themoviedb.org/3';

export function usePlayer(movieId) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [providers, setProviders] = useState(null);

    // Derived state for sources
    const [sources, setSources] = useState([]);

    useEffect(() => {
        if (!movieId) return;

        const loadData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Movie Details (EN)
                const resEn = await fetch(`${URL_API}/movie/${movieId}?api_key=${APIKEY}&language=en-US`);
                if (!resEn.ok) throw new Error('Failed to load movie');
                const movieEn = await resEn.json();

                // 2. Fetch Movie Details (PT) for Pobreflix/Smartflix search
                const resPt = await fetch(`${URL_API}/movie/${movieId}?api_key=${APIKEY}&language=pt-BR`);
                const moviePt = await resPt.json();

                setMovie({ ...movieEn, titlePt: moviePt.title });

                // 3. Fetch Trailers
                const resVideos = await fetch(`${URL_API}/movie/${movieId}/videos?api_key=${APIKEY}&language=en-US`);
                const dataVideos = await resVideos.json();
                const trailer = dataVideos.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                setTrailerKey(trailer?.key || null);

                // 4. Fetch Providers
                const resProviders = await fetch(`${URL_API}/movie/${movieId}/watch/providers?api_key=${APIKEY}`);
                const dataProviders = await resProviders.json();
                setProviders(dataProviders.results?.US || null);

                // 5. Setup Sources
                const newSources = [];
                const year = movieEn.release_date?.split('-')[0] || '';

                // YouTube
                newSources.push({
                    name: 'YouTube (Free)',
                    icon: 'fab fa-youtube',
                    color: 'bg-red-600',
                    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieEn.title + ' ' + year + ' full movie')}`,
                    tooltip: 'Search for full movie'
                });

                // Pobreflix
                newSources.push({
                    name: 'Pobreflix',
                    icon: 'fas fa-film',
                    color: 'bg-purple-600',
                    url: `https://www.pobreflixtv.beer/?s=${encodeURIComponent(moviePt.title)}`,
                    tooltip: 'Search on Pobreflix'
                });

                // Smartflix
                newSources.push({
                    name: 'Smartflix',
                    icon: 'fas fa-video',
                    color: 'bg-blue-600',
                    url: formatSmartflixUrl(moviePt.title),
                    tooltip: 'Direct link (might need search if fails)'
                });

                // Xilften
                newSources.push({
                    name: 'Xilften',
                    icon: 'fas fa-play',
                    color: 'bg-yellow-600',
                    url: `https://xilften.blog/?s=${encodeURIComponent(moviePt.title)}`,
                    tooltip: 'Search on Xilften'
                });

                setSources(newSources);

            } catch (err) {
                console.error("Error loading player data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [movieId]);

    // Helper to format smartflix url
    function formatSmartflixUrl(title) {
        const formattedTitle = title
            .toLowerCase()
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '') 
            .replace(/[^a-z0-9\s-]/g, '') 
            .trim()
            .replace(/\s+/g, '-'); 

        return `https://smartflixhd.top/filme/assistir-${formattedTitle}-online/`;
    }

    return {
        movie,
        loading,
        error,
        trailerKey,
        providers,
        sources
    };
}
