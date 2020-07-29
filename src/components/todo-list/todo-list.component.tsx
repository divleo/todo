import React from 'react';
import { ITodo } from '../../App';

import TodoListItem from '../todo-list-item/todo-list-item.component';

import './todo-list.styles.css';

type Props = {
  todos: ITodo[];
  onToggleCompleted: Function;
  onToggleImportant: Function;
  onDelete: Function;
};

const TodoList = (props: Props) => (
  <ul className="todo-list">
    {props.todos.map((todo) => {
      return (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={props.onToggleCompleted}
          onToggleImportant={props.onToggleImportant}
          onDelete={props.onDelete}
        />
      );
    })}
  </ul>
);

export default TodoList;
