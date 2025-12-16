import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../src/App';

describe('RegistrationForm', () => {
  test('handles form submission and validation', () => {
    render(<RegistrationForm />);

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    // Submit form with empty fields
    fireEvent.click(submitButton);

    // Assert validation error messages are displayed
    expect(screen.getByText('Username is required')).toBeTruthy();
    expect(screen.getByText('Email is required')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();

    // Fill in form fields
    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form with valid data
    fireEvent.click(submitButton);

    // Assert that error messages are not present anymore
    expect(screen.queryByText('Username is required')).toBeNull();
    expect(screen.queryByText('Email is required')).toBeNull();
    expect(screen.queryByText('Password is required')).toBeNull();
  });
});
