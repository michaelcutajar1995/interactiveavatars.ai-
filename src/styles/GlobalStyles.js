import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Glimpse';
    src: url('/fonts/Glimpse-Font.woff2') format('woff2'),
         url('/fonts/Glimpse-Font.woff') format('woff'),
         url('/fonts/Glimpse-Font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: 'Glimpse', sans-serif;
  }
`;

export default GlobalStyles; 