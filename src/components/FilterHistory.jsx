import React from 'react';
import PropTypes from 'prop-types';

const FilterHistory = ({ history, deleteFilter, clearHistory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Search History</h2>
      {history.length === 0 ? (
        <p>No search history.</p>
      ) : (
        <ul>
          {history.map((filter, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <div>
                <strong>Title:</strong> {filter.title || 'Any'} <br />
                <strong>Languages:</strong> {filter.language && filter.language.length > 0 ? filter.language.join(', ') : 'Any'}
              </div>
              <button
                onClick={() => deleteFilter(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="px-4 py-2 bg-gray-500 text-white rounded mt-2"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

FilterHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      language: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  deleteFilter: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
};

export default FilterHistory;
