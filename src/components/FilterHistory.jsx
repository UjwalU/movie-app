import React from 'react';
import PropTypes from 'prop-types';

const FilterHistory = ({ history, deleteFilter, clearHistory }) => {
  return (
    <div className="filter-history mb-4">
      <h3 className="text-lg font-semibold mb-2">Filter History</h3>
      <ul className="space-y-2">
        {history.map((filter, index) => (
          <li key={index} className="filter-item flex justify-between items-center p-2 border rounded">
            {filter.title} - {filter.language}
            <button onClick={() => deleteFilter(index)} className="btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearHistory} className="btn bg-red-500 text-white px-4 py-2 rounded mt-2">Delete Filter History</button>
    </div>
  );
};

FilterHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  deleteFilter: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
};

export default FilterHistory;
