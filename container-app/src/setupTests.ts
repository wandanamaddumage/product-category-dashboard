import '@testing-library/jest-dom';
import { render } from './__tests__/test-utils';
import { ReactElement } from 'react';
import { store } from './store';

// Extend the window object to include your custom properties
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace globalThis {
    // eslint-disable-next-line no-var
    var renderWithProviders: (
      ui: ReactElement,
      options?: Parameters<typeof render>[1]
    ) => ReturnType<typeof render>;
  }
}

globalThis.renderWithProviders = (ui, options) => {
  return render(ui, {
    ...options,
    store,
  });
};
