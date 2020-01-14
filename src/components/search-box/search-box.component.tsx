import React from 'react';

type Props = {
  placeholder: string;
  onSearchChange: Function;
};

const SearchBox = (props: Props) => {
  return (
    <div className="search-box">
      <input
        type="search"
        placeholder={props.placeholder}
        onChange={(event) => props.onSearchChange(event)}
      />
    </div>
  );
};

export default SearchBox;
