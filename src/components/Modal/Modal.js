import { createPortal, render } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';


import { Overlay, ModalWindow, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    const handleKeyEsc = e => {
      if (e.code === 'Escape') {
        console.log('Нажали ESC');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyEsc);
    return () => {
      window.removeEventListener('keydown', handleKeyEsc);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <Image src={url} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};