import React from 'react';

import './App.css';

import SearchBox from './components/search-box/search-box.component';
import TodoList from './components/todo-list/todo-list.component';
import ItemAddForm from './components/item-add-form/item-add-form.component';
import ItemStatusFilter from './components/item-status-filter/item-status-filter.component';

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
  filter: string;
};

class App extends React.Component<Props, State> {
  private latestId: number;

  constructor(props: Readonly<Props>) {
    super(props);

    this.latestId = 0;

    this.state = {
      todos: [],
      searchField: '',
      filter: 'all',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.onToggleCompleted = this.onToggleCompleted.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
  }

  getHalfTodos(todos: Array<any>): Array<any> {
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

  async componentDidMount(): Promise<void> {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/todos?userId=1'
    );
    const data = await res.json();

    const todos = this.getHalfTodos(data).map(this.stripTodo);

    this.setState(
      { todos },
      () => (this.latestId = todos[todos.length - 1].id)
    );
  }

  onSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchField: event.target.value });
  }

  searchTodos(todos: ITodo[], text: string): ITodo[] {
    if (text.length === 0) {
      return todos;
    }

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(text.toLocaleLowerCase())
    );
  }

  onFilterChange(name: string): void {
    this.setState({ filter: name });
  }

  filterTodos(todos: ITodo[], filter: string): ITodo[] {
    switch (filter) {
      case 'uncompleted':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
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

  onToggleCompleted(id: number): void {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'completed'),
      };
    });
  }

  onToggleImportant(id: number): void {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'important'),
      };
    });
  }

  onDelete(id: number): void {
    this.setState(({ todos }) => {
      return {
        todos: todos.filter((todo) => todo.id !== id),
      };
    });
  }

  onItemAdd(text: string): void {
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
  }

  render() {
    const visibleTodos = this.searchTodos(
      this.filterTodos(this.state.todos, this.state.filter),
      this.state.searchField
    );

    return (
      <div className="App">
        <SearchBox
          placeholder={'search todo...'}
          onSearchChange={this.onSearchChange}
        />
        <ItemStatusFilter
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
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
