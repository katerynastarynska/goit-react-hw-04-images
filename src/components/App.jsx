import { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from '../components/App.module.css';
import { getImages } from 'services/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const limit = 12;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFormImageSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setImages([]);
  };

  const fetchImages = useCallback(async () => {
    await setStatus(STATUS.PENDING);
    try {
      if (!searchQuery) {
        setStatus(STATUS.IDLE);
        setImages([]);
        return;
      }
   
      const regex = /^[A-Za-z0-9А-Яа-яЁёЇїІіЄєҐґ]+$/;
      if (!regex.test(searchQuery)) {
        setStatus(STATUS.IDLE);
        toast.error(
          'Please enter only letters and numbers in the search query'
        );
        return;
      }

      const data = await getImages({ searchQuery, limit, currentPage });
      if (!data?.hits) {
        toast.error('Service not available');
        throw new Error('Service not available');
      }
      if (!data?.hits?.length) {
        toast.error('Results not found');
        setStatus(STATUS.IDLE);
        setImages([]);
        return;
      }
      setImages(prevImages => [...prevImages, ...data.hits]);
      setTotalPages(Math.ceil(data.total / limit));
      setStatus(STATUS.RESOLVED);
      setError(null);
    } catch (error) {
      setError('Bad request');
      setStatus(STATUS.REJECTED);
    }
  }, [searchQuery, currentPage]);

  // useEffect(() => {
  //   fetchImages();
  // }, [searchQuery, currentPage, fetchImages]);

  useEffect(() => {
    toast.error(error);
  }, [status, error]);

  useEffect(() => {
    if (!searchQuery) return;
    fetchImages();
  }, [searchQuery, currentPage, fetchImages]);

  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };
  const showLoadMoreBtn = images.length !== 0 && currentPage < totalPages;

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormImageSearch} searchQuery={searchQuery} />
      <ToastContainer autoClose={3000} />

      {status === STATUS.PENDING && <Loader />}

      {status === STATUS.RESOLVED && <ImageGallery images={images} />}

      {showLoadMoreBtn && (
        <Button
          onClick={handleLoadMore}
          disabled={status === STATUS.PENDING ? true : false}
        />
      )}
    </div>
  );
};

export default App;
