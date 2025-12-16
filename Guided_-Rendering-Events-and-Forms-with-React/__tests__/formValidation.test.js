import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importing jest-dom for custom matchers like toBeInTheDocument
import RegistrationForm from '../src/App';

describe('RegistrationForm', () => {
  test('displays validation error messages when inputs are invalid or empty', () => {
    render(<RegistrationForm />);

    const submitButton = screen.getByRole('button', { name: 'Register' });

    // Submit form with empty fields
    fireEvent.click(submitButton);

    // Assert validation error messages are displayed
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is not valid')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();

    // Fill in invalid email and short password
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'john_doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'short' } });

    fireEvent.click(submitButton);

    // Assert specific validation error messages are displayed
    expect(screen.queryByText('Username is required')).toBeNull(); // Username is valid now
    expect(screen.getByText('Email is not valid')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();

    // Fill in all valid inputs
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Assert no validation error messages are displayed
    expect(screen.queryByText('Username is required')).toBeNull();
    expect(screen.queryByText('Email is not valid')).toBeNull();
    expect(screen.queryByText('Password must be at least 6 characters long')).toBeNull();
  });
});
