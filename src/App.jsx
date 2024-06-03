import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import FilterMovies from './components/FilterMovies';
import FilterHistory from './components/FilterHistory';
import Pagination from './components/Pagination';
import './App.css';

const API_KEY = '81f382d33088c6d52099a62eab51d967';
const API_URL = 'https://api.themoviedb.org/3/movie/upcoming';
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterHistory, setFilterHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [filters, page]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let url = API_URL;
      let params = {
        api_key: API_KEY,
        language: 'en-US',
        page: page,
        include_adult: false,
      };

      if (filters.title || filters.language?.length) {
        url = SEARCH_API_URL;
        params.query = filters.title || '';
        if (filters.language?.length) {
          params.with_original_language = filters.language.join(',');
        }
      }

      const response = await axios.get(url, { params });
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    const updatedHistory = [newFilters, ...filterHistory];
    setFilterHistory(updatedHistory.slice(0, 3)); // Keep only the most recent three searches
    setPage(1); 
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const deleteFilterHistory = (index) => {
    const newHistory = filterHistory.filter((_, i) => i !== index);
    setFilterHistory(newHistory);
  };

  const clearFilterHistory = () => {
    setFilterHistory([]);
  };
  const handleTitleClick = () => {
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 cursor-pointer" onClick={handleTitleClick}>MovieOrpheus</h1>
      <FilterMovies applyFilters={applyFilters} clearFilters={clearFilters} />
      <FilterHistory
        history={filterHistory}
        deleteFilter={deleteFilterHistory}
        clearHistory={clearFilterHistory}
      />
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-end">
            <Pagination currentPage={page} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
