import React from 'react';

import './item-add-form.styles.css';

type Props = {
  onItemAdd: Function;
};

type State = {
  title: string;
};

class ItemAddForm extends React.Component<Props, State> {
  state: State = {
    title: '',
  };

  onTitileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title } = this.state;

    if (title.length === 0) {
      return;
    }

    this.props.onItemAdd(title);
    this.setState({ title: '' });
  };

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.onTitileChange}
          placeholder="What should be done?"
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default ItemAddForm;
