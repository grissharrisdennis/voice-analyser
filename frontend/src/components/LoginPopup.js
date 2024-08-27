import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from '../pages/Registerpage';

const LoginPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        <form>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input type="email" id="email" name="email" required style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" name="password" required style={styles.input} />
          </div>
          <button type="submit" style={styles.loginButton}>Login</button>
        </form>
        <button style={styles.registerButton} onClick={handleRegisterClick}>
          Register
        </button>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Solid or semi-transparent background to obscure main page
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent popup background
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    position: 'relative',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'url("https://source.unsplash.com/random/800x600")', // Abstract background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#333',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '15px',
  },
  forgotPassword: {
    display: 'block',
    textAlign: 'center',
    color: '#007BFF',
    textDecoration: 'none',
    marginBottom: '20px',
  },
  registerButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default LoginPopup;






