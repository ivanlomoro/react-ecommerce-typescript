import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../authContext';
import "./LoginPage.styles.css";

export const LoginPage = () => {
  const { login } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onLogin = () => {
    const usernameIsEmpty = username.trim() === '';
    const passwordIsEmpty = password.trim() === '';
    setUsernameError(username.trim() === '' ? 'Username is required.' : '');
    setPasswordError(password.trim() === '' ? 'Password is required.' : '');

    if (usernameIsEmpty && passwordIsEmpty) {
      setUsernameError('Username and password are required.');
    } else if (username.trim() !== '' && password.trim() !== '') {
      login(username);
      navigate('/', { replace: true });
    }
  }
  return (
    <div className="form-background">
      <form className='form-content'>
        <Link to="/">
          <img src="/icono_page.png" alt="Icon" width="80" height="70" style={{ borderRadius: '50%' }} />
        </Link>
        <h2 className='form-title'>Log In</h2>
        <input className='form-input'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className='form-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='error-container'>
          {usernameError && <p className='form-error'>{usernameError}</p>}
          {passwordError && <p className='form-error'>{passwordError}</p>}
        </div>
        <button className='form-btn-login' type="button" onClick={onLogin}>
          Log In
        </button>
      </form>
    </div>
  );
}
