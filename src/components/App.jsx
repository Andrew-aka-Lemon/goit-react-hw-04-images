import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Component } from 'react';

class App extends Component {
  state = {
    searchInput: '',
  };

  searchInputHandler = input => {
    this.setState({ searchInput: input });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.searchInputHandler} />
        <ImageGallery toSearch={this.state.searchInput} />
      </>
    );
  }
}

export { App };
