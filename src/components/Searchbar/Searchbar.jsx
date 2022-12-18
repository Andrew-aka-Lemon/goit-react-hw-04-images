import PropTypes from 'prop-types';
import { Component } from 'react';

import {
  SearchFormInput,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchForm,
  Searchbar,
} from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    input: '',
  };

  inputHandler = e => {
    const { value } = e.currentTarget;
    this.setState({ input: value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input.toLowerCase());

    this.setState({ input: '' });
  };

  render() {
    return (
      <Searchbar onSubmit={this.submitHandler}>
        <SearchForm>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputHandler}
            value={this.state.input}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
