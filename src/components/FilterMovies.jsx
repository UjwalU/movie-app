import React, { useState } from 'react';
import PropTypes from 'prop-types';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'hi', name: 'Hindi' },
  // Add more languages as needed
];

const FilterMovies = ({ applyFilters, clearFilters }) => {
  const [title, setTitle] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguages(
      e.target.checked
        ? [...selectedLanguages, value]
        : selectedLanguages.filter((lang) => lang !== value)
    );
  };

  const handleApplyFilters = () => {
    applyFilters({ title, language: selectedLanguages });
  };

  const handleClearFilters = () => {
    setTitle('');
    setSelectedLanguages([]);
    clearFilters();
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={handleTitleChange}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label>Languages:</label>
        <div className="flex flex-wrap">
          {languages.map((lang) => (
            <label key={lang.code} className="mr-4">
              <input
                type="checkbox"
                value={lang.code}
                checked={selectedLanguages.includes(lang.code)}
                onChange={handleLanguageChange}
                className="mr-1"
              />
              {lang.name}
            </label>
          ))}
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

FilterMovies.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default FilterMovies;
