import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(image => {
        return (
          <li key={image.id} className={css.imageGalleryItem}>
            <ImageGalleryItem image={image} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
