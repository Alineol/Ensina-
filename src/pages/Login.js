import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import context from '../context/myContext';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const checkEmailandPassword = () => {
      const regex = /\S+@\S+\.\S+/;
      const test = regex.test(email);
      const minCaracter = 6;
      if (password.length > minCaracter && test === true) {
        setDisabled(false);
      } else { setDisabled(true); }
    };
    checkEmailandPassword();
  }, [email, password]);

  const handleLoginClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login-page">
      <form>
        <input
          className="email-input"
          type="email"
          placeholder="Email"
          data-testid="email-input"
          required
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          id="UserName"
          className="name-input"
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          required
          name="userName"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <Link to="/foods">
          <button
            data-testid="login-submit-btn"
            className="btn-login"
            type="button"
            disabled={ disabled }
            onClick={ handleLoginClick }
          >
            Play
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
