import PropTypes from 'prop-types';
import { Component } from 'react';

import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { ImageGalleryList } from './ImageGallery.styled';

import errorImg from 'images/Cat.jpg';
import PixabayAPI from 'components/PixabayAPI';

class ImageGallery extends Component {
  state = {
    error: null,
    images: [],
    currentPage: 1,
    totalPages: null,
    modalOpened: false,
    isLoadingMore: false,
    largeImage: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { toSearch } = this.props;
    const { currentPage } = this.state;

    // якщо ми ввели новий пошуковий запит
    if (
      toSearch !== prevProps.toSearch &&
      prevState.currentPage === currentPage
    ) {
      this.setState({ images: [], currentPage: 1 });
    }
    //

    // якщо ми ввели новий пошуковий запит або змінили сторінку пагінації
    if (
      prevProps.toSearch !== toSearch ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ status: 'pending' });

      PixabayAPI(toSearch, currentPage)
        .then(data => {
          if (data.total === 0) {
            return Promise.reject(new Error(`What is the <<${toSearch}>> ???`));
          }
          this.setState(({ images }) => {
            return {
              images: [...images, ...data.hits],
              status: 'ready',
              totalPages: Math.ceil(data.totalHits / 12),
              isLoadingMore: false,
            };
          });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  loadMoreHandler = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage >= totalPages) {
      return;
    }

    this.setState(({ currentPage, isLoadingMore }) => {
      return { currentPage: currentPage + 1, isLoadingMore: !isLoadingMore };
    });
  };

  onImageClick = Image => {
    this.setState(({ modalOpened }) => {
      return {
        modalOpened: !modalOpened,
        largeImage: Image,
      };
    });
  };

  toggleModal = () => {
    this.setState(({ modalOpened }) => {
      return { modalOpened: !modalOpened };
    });
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return (
        <h1 style={{ textAlign: 'center' }}>
          What do you want to look on ? Put the search above
        </h1>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'ready') {
      return (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  openModal={this.onImageClick}
                />
              );
            })}
          </ImageGalleryList>
          {this.state.isLoadingMore && <Loader />}
          {this.state.totalPages > 1 && !this.state.isLoadingMore && (
            <Button clickHandler={this.loadMoreHandler} />
          )}
          {this.state.modalOpened && (
            <Modal
              bigImage={this.state.largeImage}
              toggleModal={this.toggleModal}
            />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ textAlign: 'center', color: 'red' }}>
            {this.state.error.message}
          </h1>
          <img src={errorImg} alt="" />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  toSearch: PropTypes.string.isRequired,
};

export default ImageGallery;
