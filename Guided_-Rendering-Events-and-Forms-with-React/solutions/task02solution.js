import React, { useState } from 'react';

function RegistrationForm() {
  // Initialize form input state and error state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });

  // Implement event handlers to update state based on form input
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value === '') {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
    } else {
      setErrors(prev => ({ ...prev, username: '' }));
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value === '') {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value === '') {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  // Implement form submission logic
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Validate all fields on submit
    if (!username || !email || !password) {
      setErrors({
        username: username ? '' : 'Username is required',
        email: email ? '' : 'Email is required',
        password: password ? '' : 'Password is required'
      });
    } else {
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
    
        />
        {errors.username && <div>{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
       
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
