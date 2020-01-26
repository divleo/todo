import React from 'react';

import './item-status-filter.styles.css';

// interface IFilterButton {
//   name: string;
//   title: string;
// }

type Props = {
  filter: string;
  onFilterChange: Function;
  allTodosCount: number;
  uncompletedTodosCount: number;
  completedTodosCount: number;
};

// const filterButtons: IFilterButton[] = [
//   { name: 'all', title: 'All' },
//   { name: 'uncompleted', title: 'Active' },
//   { name: 'completed', title: 'Done' },
// ];

const ItemStatusFilter = (props: Props) => {
  // const buttons = filterButtons.map((button, i) => {
  //   return (
  //     <button
  //       key={i}
  //       type="button"
  //       onClick={() => props.onFilterChange(button.name)}
  //     >
  //       {button.title}
  //     </button>
  //   );
  // });

  // return <div className="item-status-filter">{buttons}</div>;

  return (
    <div className="item-status-filter">
      <button type="button" onClick={() => props.onFilterChange('all')}>
        All {props.allTodosCount}
      </button>
      <button type="button" onClick={() => props.onFilterChange('uncompleted')}>
        Active {props.uncompletedTodosCount}
      </button>
      <button type="button" onClick={() => props.onFilterChange('completed')}>
        Done {props.completedTodosCount}
      </button>
    </div>
  );
};

export default ItemStatusFilter;
