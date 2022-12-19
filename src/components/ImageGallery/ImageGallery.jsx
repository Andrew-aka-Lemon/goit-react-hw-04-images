import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { ImageGalleryList, ErrorBox } from './ImageGallery.styled';

import errorImg from 'images/Cat.jpg';
import PixabayAPI from 'services/PixabayAPI';
// import { smoothScroll } from 'utils/smoothScroll';

const ImageGallery = ({ toSearch }) => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [isLoadingMore, setisLoadingMore] = useState(false);
  const [largeImage, setlargeImage] = useState(null);

  const prevPage = useRef(1);
  const prevSearch = useRef('');

  useEffect(() => {
    setCurrentPage(1);
    setImages([]);
  }, [toSearch]);

  // якщо ми ввели новий пошуковий запит або змінили сторінку пагінації
  useEffect(() => {
    if (toSearch === '') {
      return;
    }

    // if (toSearch !== prevSearch.current && currentPage === prevPage.current) {
    //   setImages([]);
    //   setCurrentPage(1);
    // }

    setisLoadingMore(i => !i);

    PixabayAPI(toSearch, currentPage)
      .then(data => {
        if (data.total === 0) {
          return Promise.reject(new Error(`What is the <<${toSearch}>> ???`));
        }
        setImages(images => [...images, ...data.hits]);
        setError(null);
        setisLoadingMore(i => !i);

        settotalPages(Math.ceil(data.totalHits / 12));
        setisLoadingMore(false);
      })
      .catch(error => {
        setError(error);
        setisLoadingMore(i => !i);
      });
  }, [currentPage, toSearch]);

  const loadMoreHandler = () => {
    if (currentPage >= totalPages) {
      return;
    }
    setCurrentPage(p => p + 1);
    setisLoadingMore(i => !i);
  };

  const onImageClick = image => {
    setlargeImage(image);
    setModalOpened(m => !m);
  };

  const toggleModal = () => {
    setModalOpened(m => !m);
  };

  useEffect(() => {
    prevPage.current = currentPage;
    prevSearch.current = toSearch;
  });

  return (
    <>
      {images.length === 0 && error === null && isLoadingMore === false && (
        <h1 style={{ textAlign: 'center' }}>
          What do you want to look on ? Put the search above
        </h1>
      )}
      {isLoadingMore && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  openModal={onImageClick}
                />
              );
            })}
          </ImageGalleryList>
          {isLoadingMore && <Loader />}
          {totalPages > 1 && currentPage < totalPages && !isLoadingMore && (
            <Button clickHandler={loadMoreHandler} />
          )}
          {modalOpened && (
            <Modal bigImage={largeImage} toggleModal={toggleModal} />
          )}
        </>
      )}
      {error !== null && (
        <ErrorBox>
          <h1 style={{ color: 'red' }}>{error.message}</h1>
          <img src={errorImg} alt="" />
        </ErrorBox>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  toSearch: PropTypes.string.isRequired,
};

export default ImageGallery;
