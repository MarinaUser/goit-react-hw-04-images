import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  HeaderSearchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

import { FcSearch } from 'react-icons/fc';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
   
    if (query.trim() === '') {
      return toast.warn('Field cannot be empty!');
    }
    onSubmit(query);
    setQuery('');
  };

  const handlSearchChange = e => {
    const { value } = e.target;

    setQuery(value.trim());
  };

  return (
    <HeaderSearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FcSearch size={20} />
        </SearchFormBtn>

        <SearchFormInput
          value={query}
          onChange={handlSearchChange}
          type="text"
          name="query"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearchbar>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};