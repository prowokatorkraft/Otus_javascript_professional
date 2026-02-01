import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Counter from './Counter';
import { getAndCheckInDocument, findAndCheckInDocument, clickAndWaitSpiner } from '../helpers/testUtils';

describe('Counter', () => {
  const decreaseBtnName = 'Decrease';
  const increaseBtnName = 'Increase';
  const countText = 'count is';
  const spinerText = 'Calculating ...';

  it('renders correctly', () => {
    render(<Counter />);

    getAndCheckInDocument(countText + ' 0');
    getAndCheckInDocument(decreaseBtnName);
    getAndCheckInDocument(increaseBtnName);
  });

  it('decrease from 0 to -1', async () => {
    render(<Counter initialCount={0} />);
    const countInfo = getAndCheckInDocument(countText + ' 0');
    const decreaseButton = getAndCheckInDocument(decreaseBtnName);
    expect(decreaseButton).toBeDisabled();

    await clickAndWaitSpiner(decreaseButton, spinerText);
    expect(countInfo).toHaveTextContent('count is 0')
  });

  it('decrease from 4 to 0', async () => {
    render(<Counter initialCount={4} />);
    getAndCheckInDocument(countText + ' 4');
    const decreaseButton = getAndCheckInDocument(decreaseBtnName);

    for (let i = 4; i >= 0; i--) {
      await clickAndWaitSpiner(decreaseButton, spinerText);

      const updatedCountInfo = screen.queryByText(countText + ` ${i - 1}`);
      if (i >= 1) {
        expect(updatedCountInfo).toBeInTheDocument();
      }
      else {
        expect(updatedCountInfo).not.toBeInTheDocument();
      }
    }
  });

  it('increase from 0 to 3', async () => {
    render(<Counter initialCount={0} />);
    getAndCheckInDocument(countText + ' 0');
    const increaseButton = getAndCheckInDocument(increaseBtnName);

    for (let i = 1; i < 4; i++) {
      await clickAndWaitSpiner(increaseButton, spinerText);
      findAndCheckInDocument(countText + ` ${i}`);
    }
  });

  it('spinner on', async () => {
    render(<Counter initialLoading={true} />);
    getAndCheckInDocument(spinerText);
  });

  it('spinner off', async () => {
    render(<Counter initialLoading={false} />);
    findAndCheckInDocument(spinerText, false);
  });
});