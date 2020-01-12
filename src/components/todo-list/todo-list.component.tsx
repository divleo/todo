import React from 'react';
import { ITodo } from '../../App';

import TodoListItem from '../todo-list-item/todo-list-item.component';

import './todo-list.styles.css';

type Props = {
  todos: ITodo[];
  onToggleCompleted: Function;
};

const TodoList = (props: Props) => {
  return (
    <ul className="todo-list">
      {props.todos.map((todo) => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={props.onToggleCompleted}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
