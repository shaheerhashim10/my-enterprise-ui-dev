// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import Counter from '.';
import { render } from './test/utilities';

const renderCounter = (inititalCount: number) => {
  const { user } = render(<Counter initialCount={400} />);
  const currentCount = screen.getByTestId('current-count');
  const resetButton = screen.getByRole('button', { name: /reset/i });
  const incrementButton = screen.getByRole('button', { name: /Increment/i });

  return { user, currentCount, resetButton, incrementButton };
};

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /Increment/i });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={300} />);
  const initialCount = screen.getByTestId('current-count');
  expect(initialCount).toHaveTextContent('300');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={400} />);

  const currentCount = screen.getByTestId('current-count');
  const resetButton = screen.getByRole('button', { name: /reset/i });
  await user.click(resetButton);
  expect(currentCount).toHaveTextContent('0');
});
