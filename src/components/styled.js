import styled from 'styled-components';

export const Container = styled.div``;

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

export const BookContainer = styled.div`
  button {
    margin: 10px 0 0 15px;
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
  }

  button:hover {
    background-color: #ddd;
    color: black;
  }
`;
