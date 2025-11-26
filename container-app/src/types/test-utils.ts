import { RenderOptions } from '@testing-library/react';
import type { RootState } from '../store';

type PreloadedState = Partial<RootState>;

export interface RenderWithProvidersOptions
  extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState;
  store?: any;
}
