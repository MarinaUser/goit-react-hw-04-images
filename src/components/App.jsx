import  { useState, useEffect } from 'react';
import * as API from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Notification from './Notification';
import Button from './Button';
import Modal from './Modal';


export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  
  useEffect(() => {
    if (query === '') {
      return;
    }
    
    setIsLoading(true);

    const fetchImages = async (query, page) => {
    try {

      const response = await API.fetchImages(query.toLowerCase(), page);

       if (response.length === 0) {
        return toast.warn(
          'Search Failure. There is no images for your query. Please enter other query.'
        );
      }
  
      setItems(prev => [...prev, ...response.hits]);
      
      setShowBtn(page < Math.ceil(response.totalHits / 12));
       
    } catch {
      const message = 'Oops, something went wrong ...';
      setError({ error: message });
    } finally {
      setIsLoading(false);
    }
  };
    fetchImages(query, page);
  }, [query, page]);
 
 
  const handleSearchbarSubmit = newQuery => {
   
     if (query.toLowerCase() !== newQuery.toLowerCase()) 
      setQuery(newQuery);
      setPage(1);
      setItems([]);
      setShowBtn(false);
      setShowModal(false);
      setIsLoading(false);
      setError(null);
      setLargeImageURL(null);
      setTags(null);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };


  const toggleModal = (tags, largeImageURL) => {

    if (showModal) {
      setShowModal(!showModal);
      setTags(null);
      setLargeImageURL(null);
    } else {
      setShowModal(!showModal);
      setTags(tags);
      setLargeImageURL(largeImageURL);
    }
  };


    return (
     <Container>
        <Searchbar onSubmit={handleSearchbarSubmit} />

        {error ? (
          <Notification message={error} />) : (
          <>
            {isLoading && <Loader />}
            {items.length > 0 && (
              <>
                <ImageGallery images={items} toggleModal={toggleModal} />
              </>
              )}
              {showBtn && (
                  <Button onClick={loadMore} />
              )}
                
              {showModal && (
              <Modal url={largeImageURL} alt={tags} onClose={toggleModal} />
            )}
              
            <ToastContainer
              position="top-right"
              autoClose={3000}/>
          </>
        )}
      </Container>
    );
  }
 
