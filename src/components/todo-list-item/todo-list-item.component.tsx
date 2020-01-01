import React from 'react';
import CSS from 'csstype';
import { ITodo } from '../../App';

import './todo-list-item.styles.css';

type Props = {
  todo: ITodo;
};

const TodoListItem = (props: Props) => {
  const styles: CSS.Properties = {
    fontWeight: props.todo.important ? 'bold' : undefined,
    textDecoration: props.todo.completed ? 'line-through' : undefined,
  };

  return (
    <li className="todo-list-item">
      {props.todo.id}: <span style={styles}>{props.todo.title}</span>
    </li>
  );
};

export default TodoListItem;
