import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser, setError, clearError } from '../../redux/auth/authSlice';
import firebase from '../../config/firebase';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleRegister = async () => {
        try {
            dispatch( clearError() );
            const userCredential = await firebase.auth().createUserWithEmailAndPassword( email, password );
            console.log('done');
            const user = userCredential.user;
            dispatch( setUser( user ) );
            navigate( '/' );
        } catch ( error ) {
            dispatch( setError( error.message ) );
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
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
                onChange={ e => setPassword( e.target.value )}
            />
            <button onClick={ handleRegister }>Register</button>
        </div>
    );
};

export default RegisterPage;
