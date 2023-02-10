import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { mockedApiResponse } from '../../../tests';

jest.useFakeTimers();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedApiResponse),
  }),
) as jest.Mock;

test('should data fetched & listed, if 3 characters typed', async () => {
  render(<App />);

  fireEvent.change(screen.getByTestId('input-field'), {
    target: { value: 'erica' },
  });

  jest.advanceTimersByTime(2000);

  await screen.findByText('Favourite');

  mockedApiResponse.results.forEach((it) => {
    expect(screen.getByText(it.id)).toBeInTheDocument();
  });
});
