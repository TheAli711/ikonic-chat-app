import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  background: 'brand.200',
  color: '#fff',
  fontFamily: 'body',
  fontWeight: 'bold',
  padding: 6,
  fontSize: 'md',
  _hover: {
    background: 'brand.100',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
});
