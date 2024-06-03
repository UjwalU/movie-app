import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, setPage }) => {
  const totalPages = 3; // Fixed to 3 pages

  return (
    <div className="flex justify-end mt-4">
      {currentPage > 1 && (
        <button onClick={() => setPage(currentPage - 1)} className="px-2 py-1 mx-1 bg-blue-500 text-white rounded">
          {'<'}
        </button>
      )}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-2 py-1 mx-1 rounded ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {i + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => setPage(currentPage + 1)} className="px-2 py-1 mx-1 bg-blue-500 text-white rounded">
          {'>'}
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
