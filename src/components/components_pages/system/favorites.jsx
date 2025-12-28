import { useState } from 'react';
import { useMovies } from '../../../hooks/useMovies';

export default function FavoritesComponent() {
    const { favorites, toggleFavorite, getMovieDetails } = useMovies();
    const [selectedMovie, setSelectedMovie] = useState(null);

    const openModal = async (movie) => {
        // Optimistically set what we have
        setSelectedMovie({ ...movie, fullDetailsLoaded: false });

        // Fetch full details
        const details = await getMovieDetails(movie.id);
        if (details) {
            setSelectedMovie({ ...details, fullDetailsLoaded: true });
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    return (
        <main className="ml-64 p-10">
            {/* HEADER */}
            <header className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">My Favorites</h1>
                        <p className="mt-1 text-gray-500">Your personal collection of movies.</p>
                    </div>
                </div>
            </header>

            {/* MOVIES GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {favorites.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <i className="far fa-heart text-6xl text-gray-700 mb-4"></i>
                        <p className="text-xl text-gray-400">You haven't added any favorites yet.</p>
                        <a href="./watch" className="inline-block mt-4 bg-red-600 px-6 py-2 rounded-lg text-white hover:bg-red-700 transition">
                            Explore Movies
                        </a>
                    </div>
                ) : (
                    favorites.map(movie => (
                        <div key={movie.id} className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all hover:border-red-600/50">
                            <div onClick={() => openModal(movie)} className="h-full w-full">
                                <img
                                    src={movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                    alt={movie.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6">
                                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-red-500 line-clamp-1">{movie.title}</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-xs text-yellow-500"><i className="fas fa-star"></i> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                                        <span className="text-xs text-gray-400">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Remove Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(movie);
                                }}
                                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all"
                                title="Remove from favorites"
                            >
                                <i className="fas fa-trash text-white text-sm"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {selectedMovie && (
                <div
                    className="flex justify-center items-center min-h-screen fixed inset-0 z-50 p-4 bg-black/90 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>

                        <div className="flex flex-col md:flex-row">
                            <img
                                src={selectedMovie.poster_path ? IMG_URL + selectedMovie.poster_path : 'https://via.placeholder.com/300x450'}
                                className="w-full md:w-64 object-cover"
                                alt={selectedMovie.title}
                            />

                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-white mb-4">{selectedMovie.title}</h2>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {selectedMovie.overview || "No description available."}
                                </p>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => window.location.href = `./player?id=${selectedMovie.id}`}
                                        className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition text-white"
                                    >
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}