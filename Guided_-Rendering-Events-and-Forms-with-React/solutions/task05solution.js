import React, { useState } from 'react';

function RegistrationForm() {
  // Initialize form input state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Initialize state for error messages
  const [errors, setErrors] = useState({});

  // Implement event handlers to update state based on form input
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required";
    tempErrors.email = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? "" : "Email is not valid";
    tempErrors.password = password.length >= 6 ? "" : "Password must be at least 6 characters long";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  // Implement form submission logic
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    if (validate()) {
      console.log("Form Submitted with:", { username, email, password });
    }
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
          required
          minLength={3}
        />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={6}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
