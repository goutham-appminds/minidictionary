/* eslint-disable no-undef */
import React from 'react';
import {
  render,
} from '@testing-library/react';
import App from './App';

describe('screens/search', () => {
  test('Should handle serach with empty input', () => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
