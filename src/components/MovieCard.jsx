import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          {movie.overview}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rating: {movie.vote_average}</span>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
