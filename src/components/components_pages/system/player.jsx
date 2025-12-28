import { useState, useEffect } from 'react';
import { usePlayer } from '../../../hooks/usePlayer';

export default function PlayerComponent() {
    const [movieId, setMovieId] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null); 

    useEffect(() => {
        // Get ID from URL since we are not using Next.js Router
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            setMovieId(id);
        }
    }, []);

    const { movie, loading, error, trailerKey, providers, sources } = usePlayer(movieId);

    // Initial load

    const handleBack = () => {
        window.history.back();
    };

    if (loading) {
        return (
            <main className="ml-64 bg-gradient-to-br from-gray-900 via-red-900 to-black min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-6xl text-red-600 mb-4"></i>
                    <p className="text-2xl font-bold">Loading movie details...</p>
                </div>
            </main>
        );
    }

    if (error || !movie) {
        return (
            <main className="ml-64 bg-gradient-to-br from-gray-900 via-red-900 to-black min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
                    <p className="text-2xl font-bold mb-4">Movie not found</p>
                    <button onClick={handleBack} className="bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20 transition">
                        Go Back
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="ml-64 bg-gradient-to-br from-gray-900 via-red-900 to-black min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                {/* button back */}
                <button onClick={handleBack} className="mb-6 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition">
                    <i className="fas fa-arrow-left"></i>
                    Back
                </button>

                {/* movie info */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    <div className="flex items-center gap-4 text-gray-300 mb-4">
                        <span>{movie.release_date?.split('-')[0]}</span>
                        <span><i className="fas fa-star text-yellow-500"></i> {movie.vote_average?.toFixed(1)}</span>
                        <span>{movie.runtime} min</span>
                    </div>
                </div>

                {/* video player */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* main player */}
                    <div className="lg:col-span-2">
                        <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                {activeVideo === 'trailer' && trailerKey ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full">
                                    </iframe>
                                ) : (
                                    <div className="text-center p-8">
                                        <i className="fas fa-film text-6xl text-gray-600 mb-4"></i>
                                        <p className="text-gray-400">Select a source below to watch</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* tabs sources */}
                        <div className="mt-4 bg-white/5 rounded-xl p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <i className="fas fa-play-circle"></i>
                                Available Sources
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {/* Trailer Option */}
                                {trailerKey && (
                                    <button
                                        onClick={() => setActiveVideo('trailer')}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-sm flex items-center"
                                    >
                                        <i className="fas fa-play mr-2"></i> Official Trailer
                                    </button>
                                )}

                                {/* External Sources */}
                                {sources.map((source, index) => (
                                    <button
                                        key={index}
                                        onClick={() => window.open(source.url, '_blank')}
                                        className={`px-4 py-2 ${source.color} hover:opacity-80 rounded-lg font-semibold transition text-sm flex items-center relative group`}
                                    >
                                        <i className={`${source.icon} mr-2`}></i> {source.name}
                                        {source.tooltip && (
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                                {source.tooltip}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* description */}
                        <div className="mt-6 bg-white/5 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed">{movie.overview || 'No description available.'}</p>
                        </div>
                    </div>

                    {/* sidebar options */}
                    <div className="space-y-4">
                        {/* Trailer Official Sidebar Button */}
                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <i className="fas fa-video text-red-500"></i>
                                Official Trailer
                            </h3>
                            <button
                                onClick={() => setActiveVideo('trailer')}
                                disabled={!trailerKey}
                                className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center ${trailerKey ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 cursor-not-allowed text-gray-400'}`}
                            >
                                <i className="fas fa-play mr-2"></i>
                                {trailerKey ? 'Watch Trailer' : 'Trailer Unavailable'}
                            </button>
                        </div>

                        {/* Plataformas Legais */}
                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <i className="fas fa-tv text-blue-500"></i>
                                Legal Streaming (US)
                            </h3>
                            <div className="space-y-2">
                                {providers && providers.length > 0 ? (
                                    // Deduplicate providers
                                    [...new Map([...(providers.flatrate || []), ...(providers.buy || []), ...(providers.rent || [])].map(p => [p.provider_id, p])).values()]
                                        .slice(0, 5) // Limit to top 5 to avoid overflow
                                        .map(provider => (
                                            <div key={provider.provider_id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                                                    alt={provider.provider_name}
                                                    className="w-10 h-10 rounded"
                                                />
                                                <span className="text-sm">{provider.provider_name}</span>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-sm text-gray-400">No platforms available in this region.</p>
                                )}
                            </div>
                        </div>

                        {/* additional information */}
                        <div className="bg-white/5 rounded-xl p-4">
                            <h3 className="font-bold mb-3">Infos</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Genres:</span>
                                    <span className="text-right">{movie.genres?.map(g => g.name).join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Budget:</span>
                                    <span>{movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Revenue:</span>
                                    <span>{movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Legal Notice */}
                        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4 text-xs">
                            <p className="text-yellow-200 mb-2">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                <strong>Tips for finding the movie:</strong>
                            </p>
                            <ul className="text-yellow-200/80 space-y-1 text-[11px] ml-4">
                                <li>• <strong>YouTube:</strong> Automatic search for full movie</li>
                                <li>• <strong>Pobreflix:</strong> Direct search available</li>
                                <li>• <strong>Smartflix:</strong> Direct link (may need manual search)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}