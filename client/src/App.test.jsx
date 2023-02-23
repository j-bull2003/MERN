import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Test case to ensure that the 'learn react' link is rendered in the App component
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
