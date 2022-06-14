/* eslint-disable no-undef */
import React from 'react';
import {
  render, fireEvent, screen, act, waitFor,
} from '@testing-library/react';
import * as axios from 'axios';
import Search from './index';

const mockSuccessDefinationData = [
  {
    meanings: [
      {
        definitions: [
          {
            definition: 'Test one defination',
          },
          {
            definition: 'Test two defination',
          },
        ],
      },
    ],
  },
];

jest.mock('axios');

describe('screens/search', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  test('Should handle serach with empty input', () => {
    render(<Search />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Please enter the word to search')).toBeTruthy();
  });

  test('should render definations', async () => {
    axios.get.mockImplementation(
      () => Promise.resolve({ data: mockSuccessDefinationData }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('search here..'), {
      target: {
        value: 'Dog',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('Test one defination')).toBeTruthy();
    });
  });

  test('should handle error when api fetching failed without message', async () => {
    axios.get.mockImplementation(
      () => Promise.reject({ response: {} }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('search here..'), {
      target: {
        value: 'Dog',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('Somthing went wrong, please try after sometime')).toBeTruthy();
    });
  });

  test('should handle error when api fetching failed with message', async () => {
    axios.get.mockImplementation(
      () => Promise.reject({ response: { data: { message: 'No results found' } } }),
    );

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('search here..'), {
      target: {
        value: 'Dog',
      },
    });

    await new Promise((r) => setTimeout(r, 1000));

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeTruthy();
    });
  });
});
