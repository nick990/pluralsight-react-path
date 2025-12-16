import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../src/App';

describe('RegistrationForm', () => {
  // Test for HTML5 validation attributes
  test('ensures HTML5 validation attributes are enforced', () => {
    render(<RegistrationForm />);

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    // Try submitting the form without filling in any fields
    fireEvent.click(submitButton);

    // Check that the required attribute is enforced by checking validity
    expect(usernameInput.validity.valueMissing).toBeTruthy();
    expect(emailInput.validity.valueMissing).toBeTruthy();
    expect(passwordInput.validity.valueMissing).toBeTruthy();

    // Fill in invalid email and check pattern mismatch
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    expect(emailInput.validity.patternMismatch).toBeTruthy();

    // Fill in valid inputs and check they pass validation
    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(usernameInput.validity.valid).toBeTruthy();
    expect(emailInput.validity.valid).toBeTruthy();
    expect(passwordInput.validity.valid).toBeTruthy();
  });

  // Existing test for controlled inputs
  test('updates form input state on change', () => {
    render(<RegistrationForm />);

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert updated form input state
    expect(usernameInput.value).toBe('john_doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
