import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
});

test('renders Nestora home search', () => {
  render(<App />);
  expect(screen.getByText('A more thoughtful way home')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /find a home/i })).toBeInTheDocument();
});

test('filters the property collection and persists saved homes', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Choose a city'), { target: { value: 'Chennai' } });
  fireEvent.click(screen.getByRole('button', { name: /find a home/i }));
  expect(screen.getByText('3', { selector: '.results-toolbar strong' })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: 'Save home' })[0]);
  expect(screen.getByRole('link', { name: 'Saved homes, 1' })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('nestora:favorites'))).toHaveLength(1);
});
