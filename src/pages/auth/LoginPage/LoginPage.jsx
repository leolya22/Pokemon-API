import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import styles from './LoginPage.module.css';
import { login } from '../../../redux/auth/thunks';
import Loader from '../../../components/Loader/Loader';


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector( state => state.auth );
    const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm();

    useEffect( () => {
        error && setFormError( 'password', { type: 'manual', message: 'El email o la contraseña son incorrectos' });
    }, [ error ]);

    const handleLogin = async ({ email, password }) => {
        dispatch( login( { email, password }));
        navigate('/');
    };

    if ( status === 'loading' ) {
        return <Loader />;
    }

    return (
        <div className={ styles.container }>
            <h1 className={ styles.texto }>Ingrese al sitio</h1>
            <form className={ styles.form } onSubmit={ handleSubmit( handleLogin ) }>
                <div className={ styles.formGroup }>
                    <label className={ styles.label }>Email:</label>
                    <input 
                        type="text" 
                        { ...register( 'email', { required: 'Ingrese su email' })}
                        className={ styles.input }
                    />
                    { errors.email && <span className={ styles.error }>{ errors.email.message }</span> }
                </div>
                <div className={ styles.formGroup }>
                    <label className={ styles.label }>Contraseña:</label>
                    <input 
                        type="password" 
                        { ...register( 'password', { required: 'Ingrese su contraseña' })} 
                        className={ styles.input }
                    />
                    { errors.password && <span className={ styles.error }>{ errors.password.message }</span> }
                </div>
                <button type="submit" className={ styles.button }>Login</button>
            </form>
            <br />
            <p>Aun no tiene usuario en el sitio? <Link className={ styles.texto } to={'/register'}>Ir a registrarse</Link></p>
        </div>
    );
};

export default LoginPage;