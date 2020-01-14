import React from 'react';

import TodoList from './components/todo-list/todo-list.component';

import './App.css';
import SearchBox from './components/search-box/search-box.component';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  important: boolean;
}

type Props = {};

type State = {
  todos: ITodo[];
  searchField: string;
};

class App extends React.Component<Props, State> {
  state: State = {
    todos: [],
    searchField: '',
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

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchField: event.target.value });
  };

  searchTodos(todos: ITodo[], text: string): ITodo[] {
    if (text.length === 0) {
      return todos;
    }

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(text.toLocaleLowerCase())
    );
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
    const visibleTodos = this.searchTodos(
      this.state.todos,
      this.state.searchField
    );

    return (
      <div className="App">
        <SearchBox
          placeholder={'search todo...'}
          onSearchChange={this.onSearchChange}
        />
        <TodoList
          todos={visibleTodos}
          onToggleCompleted={this.onToggleCompleted}
          onToggleImportant={this.onToggleImportant}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default App;
