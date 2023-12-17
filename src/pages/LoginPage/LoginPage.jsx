import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser, setError, clearError } from '../../redux/auth/authSlice';
import firebase from '../../config/firebase';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async () => {
        try {
            dispatch( clearError() );
            const userCredential = await firebase.auth().signInWithEmailAndPassword( email, password );
            const user = userCredential.user;
            dispatch( setUser( user ) );
            localStorage.setItem( 'login', user );
            navigate( '/' );
        } catch ( error ) {
            dispatch( setError( error.message ) );
        }
    };

    return (
        <div>
            <h1>Ingrese al sitio</h1>
            <input
                type="email"
                placeholder="Email"
                value={ email }
                onChange={ e => setEmail( e.target.value ) }
            />
            <input
                type="password"
                placeholder="Password"
                value={ password }
                onChange={ e => setPassword( e.target.value ) }
            />
            <button onClick={ handleLogin }>Login</button>
        </div>
    );
};

export default LoginPage;