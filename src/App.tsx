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

  toggleProperty(todos: ITodo[], id: number, property: keyof ITodo): ITodo[] {
    return todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, [property]: !todo[property] };
      } else {
        return todo;
      }
    });
  }

  onToggleCompleted = (id: number): void => {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'completed'),
      };
    });
  };

  onToggleImportant = (id: number): void => {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'important'),
      };
    });
  };

  onDelete = (id: number): void => {
    this.setState(({ todos }) => {
      return {
        todos: todos.filter((todo) => todo.id !== id),
      };
    });
  };

  render() {
    return (
      <div className="App">
        <TodoList
          todos={this.state.todos}
          onToggleCompleted={this.onToggleCompleted}
          onToggleImportant={this.onToggleImportant}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default App;
