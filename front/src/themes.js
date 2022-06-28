import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  fontColor: '#000',
};
export const darkTheme = {
  body: '#000',
  fontColor: 'wheat',
  borderColor: 'white',
};
export const GlobalStyles = createGlobalStyle`
  body{
    background-color:${(props) => props.theme.body}

  }
`;
