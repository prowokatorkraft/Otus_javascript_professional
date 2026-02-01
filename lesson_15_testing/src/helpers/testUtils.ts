import { expect } from 'vitest';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function getAndCheckInDocument(text: string, toBe: boolean = true): HTMLElement {
  const countInfo = screen.getByText(text);
  if (toBe) {
    expect(countInfo).toBeInTheDocument();
  }
  else {
    expect(countInfo).not.toBeInTheDocument();
  }
  return countInfo
}

export function findAndCheckInDocument(text: string, toBe: boolean = true): HTMLElement | null {
  const countInfo = screen.queryByText(text);
  if (toBe) {
    expect(countInfo).toBeInTheDocument();
  }
  else {
    expect(countInfo).not.toBeInTheDocument();
  }
  return countInfo
}

export async function clickAndWaitSpiner(button: HTMLElement, spinerText: string) {
  await userEvent.click(button)
  if (screen.queryByText(spinerText)) {
    await waitForElementToBeRemoved(() => {
      return screen.queryByText(spinerText);
    }, { timeout: 1000 });
  }
}