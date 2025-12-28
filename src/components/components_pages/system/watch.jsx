import { useState, useRef } from 'react';
import { useMovies } from '../../../hooks/useMovies';

export default function WatchComponent() {
    const {
        movies,
        loading,
        searchMovies,
        filterByGenre,
        toggleFavorite,
        isFavorite,
        getMovieDetails
    } = useMovies();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const searchTimeoutRef = useRef(null);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchMovies(term);
        }, 500);
    };

    const clearSearch = () => {
        setSearchTerm('');
        searchMovies(''); 
    };

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

            {/* HEADER WITH SEARCHBAR */}
            <header className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Explore</h1>
                        <p className="mt-1 text-gray-500">Discover new content curated just for you.</p>
                    </div>
                </div>

                {/* SEARCHBAR */}
                <div className="relative max-w-2xl">
                    <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                        <input
                            type="text"
                            placeholder="Search movies, genres, actors..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
                        />
                        {/* Clear button */}
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick suggestions */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="text-xs text-gray-500">Suggestions:</span>
                    {['action', 'comedy', 'horror', 'scifi', 'romance', 'animation'].map(genre => (
                        <button
                            key={genre}
                            onClick={() => filterByGenre(genre)}
                            className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 rounded-full text-xs text-gray-400 hover:text-red-500 transition-all capitalize"
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </header>

            {/* MOVIES GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                    <div className="col-span-full text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-red-600"></i>
                        <p className="mt-4 text-gray-400">Loading movies...</p>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <i className="fas fa-film text-6xl text-gray-600 mb-4"></i>
                        <p className="text-xl text-gray-400">No movies found</p>
                    </div>
                ) : (
                    movies.map(movie => {
                        const isFav = isFavorite(movie.id);
                        return (
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

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(movie);
                                    }}
                                    className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all ${isFav ? 'bg-red-600' : ''}`}
                                >
                                    <i className={`${isFav ? 'fas' : 'far'} fa-heart text-base ${isFav ? 'text-white' : 'text-white'}`}></i>
                                </button>
                            </div>
                        );
                    })
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