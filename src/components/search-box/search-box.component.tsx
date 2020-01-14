import React from 'react';

type Props = {};

const SearchBox = (props: Props) => {
  return (
    <div className="search-box">
      <input type="search" placeholder="search..." />
    </div>
  );
};

export default SearchBox;
