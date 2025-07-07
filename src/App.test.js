import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header logo', () => {
  render(<App />);
  const logoElement = screen.getAllByText(/coinologi/i)[0];
  expect(logoElement).toBeInTheDocument();
});
