import React from 'react';

import './App.css';

import SearchBox from './components/search-box/search-box.component';
import TodoList from './components/todo-list/todo-list.component';
import ItemAddForm from './components/item-add-form/item-add-form.component';

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
  latestId: number = 0;

  state: State = {
    todos: [],
    searchField: '',
  };

  getHalfTodos(todos: any): ITodo[] {
    return todos.slice(0, Math.floor(todos.length / 2));
  }

  stripTodo(todo: ITodo): ITodo {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      important: !todo.completed,
    };
  }

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((response) => response.json())
      .then((todos) => this.getHalfTodos(todos).map(this.stripTodo))
      .then((strippedTodos) => this.setState({ todos: strippedTodos }))
      .then(() => {
        const { todos } = this.state;
        this.latestId = todos[todos.length - 1].id;
      });
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

  onItemAdd = (text: string): void => {
    this.setState(({ todos }) => {
      this.latestId += 1;

      const newTodo: ITodo = {
        id: this.latestId,
        title: text,
        completed: false,
        important: false,
      };

      return {
        todos: [...todos, newTodo],
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
        <ItemAddForm onItemAdd={this.onItemAdd} />
      </div>
    );
  }
}

export default App;
