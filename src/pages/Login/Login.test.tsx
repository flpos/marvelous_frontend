import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';

test('renders form', () => {
  render(<Login />);
  const formElement = screen.getByRole('login-form');
  expect(formElement).toBeInTheDocument();

  const usernameElement = screen.getByPlaceholderText(/usuário/i);
  expect(usernameElement).toBeInTheDocument();

  const passwordElement = screen.getByPlaceholderText(/senha/i);
  expect(passwordElement).toBeInTheDocument();
  expect(passwordElement.getAttribute('type')).toBe('password');

  const loginButtonElement = screen.getByText(/entrar/i);
  expect(loginButtonElement).toBeInTheDocument();
  expect(loginButtonElement.nodeName).toBe('BUTTON');
});
