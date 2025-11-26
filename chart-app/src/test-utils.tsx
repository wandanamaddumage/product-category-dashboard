import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';

const customRender = (
  ui: ReactElement,
  { wrapper: Wrapper, ...options } = {} as any
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider>{children}</ChakraProvider>;
  };

  return rtlRender(ui, { wrapper: Wrapper || AllProviders, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method and export other utilities
export { customRender as render, screen, fireEvent, waitFor, act };
