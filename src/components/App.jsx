import React, { Component } from 'react';
import * as API from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';


import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Notification from './Notification';
import Button from './Button';
import Modal from './Modal';


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: null,
    tags: null,
    showBtn: false,
    
  };


  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const response = await API.fetchImages(query.toLowerCase(), page);

    
        this.setState(prevState => ({
          items: [...prevState.items, ...response.hits],
          showBtn: this.state.page < Math.ceil(response.totalHits / 12),
        }));
      
      

      if (response.length === 0) {
        return toast.warn(
          'Search Failure. There is no images for your query. Please enter other query.'
        );
      }
    } catch {
      const message = 'Oops, something went wrong ...';
      this.setState({ error: message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

 
  handleSearchbarSubmit = query => {
    // console.log(query);
    // console.log(this.state);
    if (this.state.query.toLowerCase() !== query.toLowerCase()) {
      this.setState({ query, page: 1, items: [] });
    } else {
      this.setState({ page: 1 });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  toggleModal = (tags, largeImageURL) => {
    const { showModal } = this.state;

    showModal
      ? this.setState(({ showModal }) => ({
          showModal: !showModal,
          tags: null,
          largeImageURL: null,
        }))
      : this.setState(({ showModal }) => ({
          showModal: !showModal,
          tags,
          largeImageURL,
        }));
  };

  

  render() {
    const { items, error, isLoading, showModal, largeImageURL, tags, showBtn } = this.state;
    const { handleSearchbarSubmit, loadMore, toggleModal } = this;

    return (
     <Container>
        <Searchbar onSubmit={handleSearchbarSubmit} />

        {error ? (
          <Notification message={error} />) : (
          <>
            {isLoading && <Loader />}
            {items.length > 0 && !isLoading && (
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
}
