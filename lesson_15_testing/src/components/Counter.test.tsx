import { describe, it, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  const decreaseBtnName = 'Decrease';
  const increaseBtnName = 'Increase';
  const countText = 'count is';
  const spinerText = 'Calculating ...';
  const waitSpiner = async () => {
    if (screen.queryByText(spinerText)) {
      await waitForElementToBeRemoved(() => {
        return screen.queryByText(spinerText);
      }, { timeout: 1000 });
    }
  };

  it('renders correctly', () => {
    render(<Counter />);

    const countInfo = screen.getByText(countText + ' 0');
    expect(countInfo).toBeInTheDocument();

    const decreaseButton = screen.getByText(decreaseBtnName);
    expect(decreaseButton).toBeInTheDocument();

    const increaseButton = screen.getByText(increaseBtnName);
    expect(increaseButton).toBeInTheDocument();
  });

  it('decrease from 0 to -1', async () => {
    render(<Counter initialCount={0} />);

    const countInfo = screen.getByText(countText + ' 0');
    expect(countInfo).toBeInTheDocument();

    const decreaseButton = screen.getByText(decreaseBtnName);
    expect(decreaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();

    await userEvent.click(decreaseButton)
    await waitSpiner();
    expect(countInfo.textContent).equal(countText + ' 0')
  });

  it('decrease from 4 to 0', async () => {
    render(<Counter initialCount={4} />);

    const countInfo = screen.getByText(countText + ' 4');
    expect(countInfo).toBeInTheDocument();

    const decreaseButton = screen.getByText(decreaseBtnName);
    expect(decreaseButton).toBeInTheDocument();

    for (let i = 3; i >= -1; i--) {
      await userEvent.click(decreaseButton)
      await waitSpiner();

      const updatedCountInfo = screen.queryByText(countText + ` ${i}`);
      if (i >= 0) {
        expect(updatedCountInfo).toBeInTheDocument();
      }
      else {
        expect(updatedCountInfo).not.toBeInTheDocument();
      }
    }
  });

  it('increase from 0 to 3', async () => {
    render(<Counter initialCount={0} />);

    const countInfo = screen.getByText(countText + ' 0');
    expect(countInfo).toBeInTheDocument();

    const increaseButton = screen.getByText(increaseBtnName);
    expect(increaseButton).toBeInTheDocument();

    for (let i = 1; i < 4; i++) {
      await userEvent.click(increaseButton)
      await waitSpiner();

      const updatedCountInfo = screen.queryByText(countText + ` ${i}`);
      expect(updatedCountInfo).toBeInTheDocument();
    }
  });

  it('spinner on', async () => {
    render(<Counter initialLoading={true} />);

    const spinner = screen.queryByText(spinerText);
    expect(spinner).toBeInTheDocument();
  });

  it('spinner off', async () => {
    render(<Counter initialLoading={false} />);

    const spinner = screen.queryByText(spinerText);
    expect(spinner).not.toBeInTheDocument();
  });
});