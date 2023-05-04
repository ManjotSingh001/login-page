import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/login', { username, password })
      .then((response) => {
        if (response.status === 200) {
          const { role, id, father_name, URN, CRN } = response.data;

          // Store the user ID, role, and additional fields in the local storage
          localStorage.setItem('userId', id);
          localStorage.setItem('userRole', role);
          localStorage.setItem('father_name', father_name);
          localStorage.setItem('URN', URN);
          localStorage.setItem('CRN', CRN);

          if (role === 'advisor') {
            window.location.href = '/advisor-dashboard';
          } else if (role === 'student') {
            navigate('/student-dashboard');
          } else if (role === 'staff') {
            navigate('/staff-dashboard');
          } else {
            navigate('/default');
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Unsuccessful login');
        } else {
          alert('An error occurred');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to,</h1>
      <h2>College no dues portal</h2>

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <div className="form-footer">
        <div className="checkbox">
          <input type="checkbox" id="remember-me" name="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <a href="https://academics.gndec.ac.in/forgotpassword/" className="forgot-password">Forgot Password?</a>
      </div>

      <input type="submit" value="Login" />
    </form>
  );
}

export default LoginForm;
