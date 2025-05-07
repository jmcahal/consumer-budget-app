import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Grocery Budgeting Tool heading', () => {
  render(<App />);
  const heading = screen.getByText(/Grocery Budgeting Tool/i);
  expect(heading).toBeInTheDocument();
});

test('renders budget input field and button', () => {
  render(<App />);
  const budgetInput = screen.getByPlaceholderText(/e\.g\. 100/i);
  const setBudgetButton = screen.getByRole('button', { name: /set budget/i });
  expect(budgetInput).toBeInTheDocument();
  expect(setBudgetButton).toBeInTheDocument();
});

test('renders add item form', () => {
  render(<App />);
  const itemNameInput = screen.getByPlaceholderText(/item name/i);
  const addItemButton = screen.getByRole('button', { name: /add item/i });
  expect(itemNameInput).toBeInTheDocument();
  expect(addItemButton).toBeInTheDocument();
});
