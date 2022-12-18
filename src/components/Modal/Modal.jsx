import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');

const Modal = ({ bigImage, toggleModal }) => {
  useEffect(() => {
    const handleEscDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleEscDown);

    return () => {
      window.removeEventListener('keydown', handleEscDown);
    };
  }, [toggleModal]);

  const handleOverlayClick = e => {
    if (e.currentTarget !== e.target) {
      return;
    }

    toggleModal();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <img src={bigImage} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
