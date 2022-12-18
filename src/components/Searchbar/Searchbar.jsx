import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchFormInput,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchForm,
  Searchbar,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const inputHandler = e => {
    const { value } = e.currentTarget;
    setInput(value);
  };

  const submitHandler = e => {
    e.preventDefault();

    onSubmit(input.toLowerCase());

    setInput('');
  };

  return (
    <Searchbar onSubmit={submitHandler}>
      <SearchForm>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={inputHandler}
          value={input}
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
