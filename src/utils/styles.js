import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

export const themes = {
  default: {
    name: 'Défaut',
    colors: {
      main: '#ffffff',
      second: '#328591',
      ter: '#F56A00',
      quad: '255, 255, 255',
      background: '#328591',
      text: '#ffffff',
      error: '#e10600',
    },
    fonts: {
      body: '"Poppins", sans-serif',
      title: '"Baloo Chettan 2", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${46}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
  classic: {
    name: 'Classique',
    colors: {
      main: '#EF0D50',
      second: '#ffffff',
      ter: '#EF0D50',
      quad: '#ffffff',
      background: '#ffffff',
      text: '#32337B',
    },
    fonts: {
      body: '"Poppins", sans-serif',
      title: '"Baloo Chettan 2", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${46}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
  night: {
    name: 'Nuit',
    colors: {
      main: '#92F2D2',
      second: '#1e1e1e',
      ter: '#ffffff',
      quad: '#1e1e1e',
      background: '#1e1e1e',
      text: '#ffffff',
    },
    fonts: {
      body: '"Poppins", sans-serif',
      title: '"Baloo Chettan 2", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${46}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
  simple: {
    name: 'Simple',
    colors: {
      main: '#000091',
      second: '#ffffff',
      ter: '#1e1e1e',
      quad: '#ffffff',
      background: '#ffffff',
      text: '#1e1e1e',
    },
    fonts: {
      body: '"Poppins", sans-serif',
      title: '"Baloo Chettan 2", sans-serif',
    },
    mq: {
      small: `@media screen and (max-width: ${46}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: 500;
    line-height: 1.4;
    text-rendering: geometricPrecision;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  } 

  *, *:before, *:after {
    margin-top: 0;
    box-sizing: inherit;
  }

  #root {
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-family: ${(props) => props.theme.fonts.title};
    font-weight: 600;
    line-height: 1.2;
  }

  h2 {
    font-size: 2rem;

    ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
  }

  a {
    color: ${(props) => props.theme.colors.main};
  }

  option {
    color: #010101;
  }
`
