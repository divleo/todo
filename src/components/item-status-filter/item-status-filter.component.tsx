import React from 'react';

import './item-status-filter.styles.css';

interface IFilterButton {
  name: string;
  title: string;
}

type Props = {
  filter: string;
  onFilterChange: Function;
};

const filterButtons: IFilterButton[] = [
  { name: 'all', title: 'All' },
  { name: 'uncompleted', title: 'Active' },
  { name: 'completed', title: 'Done' },
];

const ItemStatusFilter = (props: Props) => {
  const buttons = filterButtons.map((button, i) => {
    const isClicked = button.name === props.filter;
    const classNames = isClicked
      ? 'filter-button filter-button-clicked'
      : 'filter-button';

    return (
      <button
        key={i}
        type="button"
        onClick={() => props.onFilterChange(button.name)}
        className={classNames}
      >
        {button.title}
      </button>
    );
  });

  return <div className="item-status-filter">{buttons}</div>;
};

export default ItemStatusFilter;
