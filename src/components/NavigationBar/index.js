import React from 'react';
import SearchBar from '../SearchBar';
import { Container, Header, NavigationLink } from './styled';

function NavigationBar() {
  return (
    <Container>
      <Header style={{ marginLeft: 40 }}>ROB Resources</Header>
      <NavigationLink href="/" style={{ marginLeft: 60 }}>Bible</NavigationLink>
      <NavigationLink href="/" style={{ marginLeft: 40 }}>OBS</NavigationLink>
      <NavigationLink href="/" style={{ marginLeft: 40 }}>Bible in your language</NavigationLink>
      <SearchBar style={{ marginLeft: 'auto', marginRight: 40 }} />
    </Container>
  );
}

export default NavigationBar;
