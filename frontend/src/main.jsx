import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.js';
import App from './App.jsx';
import './index.css';

// const theme = extendTheme({
//   colors: {
//     mintcream: {
//       50: '#f5fffa',
//       100: '#e0ffeb',
//       200: '#b3ffcb',
//       300: '#80ffaa',
//       400: '#4dff89',
//       500: '#1aff68',
//       600: '#17e05a',
//       700: '#14b64c',
//       800: '#118d3e',
//       900: '#0e632f',
//     },
//   },
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
