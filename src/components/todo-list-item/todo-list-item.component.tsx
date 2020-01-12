import React from 'react';
import CSS from 'csstype';
import { ITodo } from '../../App';

import './todo-list-item.styles.css';

type Props = {
  todo: ITodo;
  onToggleCompleted: Function;
};

const TodoListItem = (props: Props) => {
  const styles: CSS.Properties = {
    textDecoration: props.todo.completed ? 'line-through' : undefined,
    fontWeight: props.todo.important ? 'bold' : undefined,
  };

  return (
    <li className="todo-list-item">
      {props.todo.id}:{' '}
      <span
        className="todo-list-item-title"
        style={styles}
        onClick={() => props.onToggleCompleted(props.todo.id)}
      >
        {props.todo.title}
      </span>
    </li>
  );
};

export default TodoListItem;
