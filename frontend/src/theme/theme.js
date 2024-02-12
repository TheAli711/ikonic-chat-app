// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { buttonTheme as Button } from './Button';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const CustomTheme = extendTheme({
  colors: {
    brand: {
      100: '#2B66B3',
      200: '#149CF0',
      300: '#83C0C1',
      400: '#96E9C6',
      500: '#fff',
    },
  },
  breakpoints,
  config,
  components: {
    Button,
  },
});

export default CustomTheme;
