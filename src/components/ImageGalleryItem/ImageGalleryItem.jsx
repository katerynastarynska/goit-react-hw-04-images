import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <img
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={toggleModal}
        image={image}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
