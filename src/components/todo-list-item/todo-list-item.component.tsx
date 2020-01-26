import React from 'react';
import CSS from 'csstype';
import { ITodo } from '../../App';

import './todo-list-item.styles.css';

type Props = {
  todo: ITodo;
  onToggleCompleted: Function;
  onToggleImportant: Function;
  onDelete: Function;
};

const TodoListItem = (props: Props) => {
  const styles: CSS.Properties = {
    textDecoration: props.todo.completed ? 'line-through' : undefined,
    fontWeight: props.todo.important ? 'bold' : undefined,
  };

  return (
    <li className="todo-list-item">
      <p>
        {props.todo.id}:{' '}
        <span className="todo-list-item-title" style={styles}>
          {props.todo.title}
        </span>
      </p>
      <div className="todo-list-item-buttons">
        <button
          className="todo-list-item-button"
          onClick={() => props.onToggleCompleted(props.todo.id)}
        >
          ✓
        </button>
        <button
          className="todo-list-item-button"
          onClick={() => props.onToggleImportant(props.todo.id)}
        >
          !
        </button>
        <button
          className="todo-list-item-button"
          onClick={() => props.onDelete(props.todo.id)}
        >
          ☓
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
