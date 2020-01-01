import React from 'react';
import CSS from 'csstype';

import './App.css';

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  important: boolean;
}

interface IProps {}

interface IState {
  todos: ITodo[];
}

class App extends React.Component<IProps, IState> {
  state: IState = {
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

  render() {
    return (
      <div className="App">
        {this.state.todos.map((todo) => {
          const styles: CSS.Properties = {
            fontWeight: todo.important ? 'bold' : undefined,
            textDecoration: todo.completed ? 'line-through' : undefined,
          };

          return (
            <ul key={todo.id} className="todo-list">
              <li style={styles}>
                <span>{todo.id}</span>: {todo.title}
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default App;
