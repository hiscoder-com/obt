import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';

export const Projects = styled.div`
  width: 70%;
  margin: auto;

  h2 {
    color: black;
    font-family: arial, sant-serif;
  }

  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 350px;
  }
  button {
    background-color: transparent;
    border: none;
    font-family: arial, sant-serif;
    color: #7abfe8;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
  }
  
`;

export const useStyles = makeStyles((theme) => ({
  falseElement: {
    backgroundColor: 'transparent',
    border: 'none',
    fontFamily: 'arial, sant-serif',
    color: '#bbbbbb',
    fontWeight: 600,
    fontSize: 18
  },
  
}));


  
