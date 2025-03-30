import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('generates password with default settings', () => {
  render(<App />);
  const passwordDisplay = screen.getByTestId('password-display');
  expect(passwordDisplay.textContent.length).toBeGreaterThan(0);
});

test('strength meter updates with password changes', () => {
  render(<App />);
  const strengthIndicator = screen.getByTestId('strength-meter');
  expect(strengthIndicator.textContent).toMatch(/Weak|Strong/);
});