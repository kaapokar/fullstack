import React from 'react';

const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={searchTerm} onChange={onSearchChange} />
      </div>
    </form>
  );
};

export default Filter
