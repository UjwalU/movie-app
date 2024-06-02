import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FilterMovies = ({ applyFilters, clearFilters }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');

  const handleApplyFilters = () => {
    applyFilters({ title, language });
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        <input
          type="text"
          className="border rounded px-2 py-1"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          {/* Add more languages as needed */}
        </select>
        <button onClick={handleApplyFilters} className="bg-blue-500 text-white rounded px-4 py-2">Filter</button>
        <button onClick={clearFilters} className="bg-red-500 text-white rounded px-4 py-2">Clear Filters</button>
      </div>
    </div>
  );
};

FilterMovies.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default FilterMovies;
