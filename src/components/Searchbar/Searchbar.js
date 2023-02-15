import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  HeaderSearchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    if (this.state.query.trim() === '') {
      return toast.warn('Field cannot be empty!');
    }

    this.props.onSubmit(this.state.query);

    // this.reset();
  };

  handlSearchChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value.trim() });
  };

  // reset = () => {
  //   this.setState({ query: '' });
  // };

  render() {
    const { handleSubmit, handlSearchChange } = this;
    const { query } = this.state;
    // console.log(this.state);
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};