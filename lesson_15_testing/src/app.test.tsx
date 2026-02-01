
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { getAndCheckInDocument } from './helpers/testUtils';

describe('App', () => {
    it('renders correctly', () => {
      render(<App />);
      getAndCheckInDocument('Vite + React')
    });
});