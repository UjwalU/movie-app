import { useState } from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative border rounded overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p>Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-white bg-opacity-90 p-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm mb-2">{movie.release_date}</p>
          <p className="text-sm mb-4">{movie.overview}</p>
          <p className="text-sm">Language: {movie.original_language}</p>
          <p className="text-sm">Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
        </div>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
