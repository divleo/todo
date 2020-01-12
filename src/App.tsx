import React from 'react';

import TodoList from './components/todo-list/todo-list.component';

import './App.css';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  important: boolean;
}

type Props = {};

type State = {
  todos: ITodo[];
};

class App extends React.Component<Props, State> {
  state: State = {
    todos: [],
  };

  getHalfTodos(todos: any): any {
    return todos.slice(0, Math.floor(todos.length / 2));
  }

  stripTodo(todo: any): ITodo {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      important: !todo.completed,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((response) => response.json())
      .then((todos) => this.getHalfTodos(todos).map(this.stripTodo))
      .then((strippedTodos) => this.setState({ todos: strippedTodos }));
  }

  onToggleCompleted = (id: number) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        }),
      };
    });
  };

  render() {
    return (
      <div className="App">
        <TodoList
          todos={this.state.todos}
          onToggleCompleted={this.onToggleCompleted}
        />
      </div>
    );
  }
}

export default App;
