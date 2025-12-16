import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegistrationForm from '../src/App'; // Adjust the import path as needed

describe('RegistrationForm', () => {
  it('updates the username, email, and password in the state when input changes', () => {
    const { getByLabelText } = render(<RegistrationForm />);
    
    // Access the input elements by the text content of their labels
    const usernameInput = getByLabelText('Username:');
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');

    // Simulate user typing into the input fields
    fireEvent.change(usernameInput, { target: { value: 'newUser' } });
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if the input's value reflects the change
    expect(usernameInput.value).toBe('newUser');
    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('prevents default form submission and logs the form data', () => {
    const { getByLabelText, getByText } = render(<RegistrationForm />);
    const usernameInput = getByLabelText('Username:');
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'newUser' } });
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    console.log = jest.fn(); // Mock console.log
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Submitted with:', { username: 'newUser', email: 'user@example.com', password: 'password123' });
  });
});
