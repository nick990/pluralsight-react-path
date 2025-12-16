import React, { useState } from 'react';

function RegistrationForm() {
  // Initialize form input state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Implement event handlers to update state based on form input
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Implement form submission logic
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    console.log("Form Submitted with:", { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required // Basic HTML5 validation to ensure the field is not empty
          minLength={3} // Minimum length for the username
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required // Ensures the user cannot submit the form without filling out this field
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regex pattern for basic email validation
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required // Basic HTML5 validation to ensure the field is not empty
          minLength={6} // Minimum length for the password
        />
      </div>
      <button type="submit">
        Register
      </button>
            {/* TODO: Display validation error messages */}
    </form>
  );
}

export default RegistrationForm;
