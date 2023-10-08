import { useState, ChangeEvent, MouseEvent } from 'react';
import Modal from 'react-modal';
import './ModalLogin.styles.css';

Modal.setAppElement('#root');

interface ModalLoginProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleToggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        onClose();
    };

    const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Modal className="form-background" isOpen={isOpen} onRequestClose={onClose}>
            <form className='form-content'>
                <h2 className='form-title'>{isRegistering ? 'Register' : 'Log In'}</h2>
                <input className='form-input'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input className='form-input'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {isRegistering ? (
                    <button className='form-btn' onClick={handleRegister}>Register</button>
                ) : (
                    <button className='form-btn'onClick={handleLogin}>Log In</button>
                )}
                <p className='p-text'>
                    {isRegistering
                        ? 'Already have an account?'
                        : 'Don\'t have an account?'}
                    <button className='form-btn-login' type="button" onClick={handleToggleRegister}>
                        {isRegistering ? 'Log In' : 'Register'}
                    </button>
                </p>
            </form>
        </Modal>
    );
}
