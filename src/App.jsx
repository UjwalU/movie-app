import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import FilterMovies from './components/FilterMovies';
import FilterHistory from './components/FilterHistory';
import './App.css';

const API_KEY = '81f382d33088c6d52099a62eab51d967';
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterHistory, setFilterHistory] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const fetchMovies = async () => {
    try {
      let response;
      if (Object.keys(filters).length === 0) {
        response = await axios.get(POPULAR_MOVIES_URL, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
          },
        });
      } else {
        response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            query: filters.title || '',
            page: 1,
            include_adult: false,
          },
        });
      }
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setFilterHistory([...filterHistory, newFilters]);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const deleteFilterHistory = (index) => {
    const newHistory = filterHistory.filter((_, i) => i !== index);
    setFilterHistory(newHistory);
  };

  const clearFilterHistory = () => {
    setFilterHistory([]);
  };

  return (
    <div className="container mx-auto p-4">
      <FilterMovies applyFilters={applyFilters} clearFilters={clearFilters} />
      <FilterHistory
        history={filterHistory}
        deleteFilter={deleteFilterHistory}
        clearHistory={clearFilterHistory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
