import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [searchInput, setsearchInput] = useState('');

  const searchInputHandler = input => {
    setsearchInput(input);
  };

  return (
    <Application>
      <SearchBar onSubmit={searchInputHandler} />
      <ImageGallery toSearch={searchInput} />
    </Application>
  );
};

const Application = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export { App };
