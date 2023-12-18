import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { setUser, setError, clearError } from '../../redux/auth/authSlice';
import firebase from '../../config/firebase';
import styles from './RegisterPage.module.css';


const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector( state => state.auth );
    const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm();

    useEffect( () => {
        if( user ) {
            navigate( '/' );
        }
    }, []);

    const handleRegister = async ({ name, email, password }) => {
        try {
            dispatch( clearError() );
            const userCredential = await firebase.auth().createUserWithEmailAndPassword( email, password );
            const firebaseUser = userCredential.user;
            await firebaseUser.updateProfile({
                displayName: name,
            });
            dispatch( setUser( firebaseUser ) );
            navigate( '/' );
        } catch ( error ) {
            setFormError( 'password', { type: 'manual', message: 'Registration failed' } );
            dispatch( setError( error.message ) );
        }
    };

    return (
        <div className={ styles.container }>
            <h1 className={ styles.texto }>Complete el formulario para registrarse</h1>
            <form className={ styles.form } onSubmit={ handleSubmit( handleRegister ) }>
                <div className={ styles.formGroup }>
                    <label className={ styles.label }>Nombre:</label>
                    <input 
                        type="text" 
                        { ...register( 'name', { 
                            required: 'Ingrese su nombre', 
                            minLength: { value: 3, message: 'Ingrese su nombre' },
                        })}
                        className={ styles.input } 
                    />
                    { errors.name && <span className={ styles.error }>{ errors.name.message }</span> }
                </div>
                <div className={ styles.formGroup }>
                    <label className={ styles.label }>Email:</label>
                    <input 
                        type="text" 
                        { ...register( 'email', { required: 'El email es obligatorio' } ) } 
                        className={ styles.input }
                    />
                    { errors.email && <span className={ styles.error }>{ errors.email.message }</span> }
                </div>
                <div className={ styles.formGroup }>
                    <label className={ styles.label }>Contraseña:</label>
                    <input 
                        type="password" 
                        { ...register( 'password', { 
                            required: 'La contraseña es obligatoria',
                            minLength: { value: 6, message: 'La contraseña tiene que tener minimo 6 digitos' },
                        })} 
                        className={ styles.input }
                    />
                    { errors.password && <span className={ styles.error }>{ errors.password.message }</span> }
                </div>
                <button type="submit" className={ styles.button }>Register</button>
            </form>
            <br />
            <p>Ya esta registrado en el sitio? <Link className={ styles.texto } to={'/login'}>Ir al login</Link></p>
        </div>
    );
};

export default RegisterPage;
