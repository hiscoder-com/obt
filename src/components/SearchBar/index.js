import React from 'react';
import PropTypes from 'prop-types';
import { Container, SearchInput } from './styled';
import SearchIcon from './search.svg';

function SearchBar({ style }) {
  return (
    <Container style={style}>
      <SearchInput />
      <img style={{ marginLeft: 8 }} alt="search-bar" src={SearchIcon} />
    </Container>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  style: PropTypes.object,
};
