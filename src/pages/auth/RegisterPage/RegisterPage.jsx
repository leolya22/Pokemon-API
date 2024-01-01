import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import styles from './RegisterPage.module.css';
import Loader from '../../../components/Loader/Loader';
import { registerUser } from '../../../redux/auth/thunks';


const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status, error } = useSelector( state => state.auth );
    const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm();

    useEffect( () => {
        if( user ) {
            navigate( '/' );
        }
    }, [ user ]);

    useEffect( () => {
        error && setFormError( 'email', { type: 'manual', message: 'El email ya esta registrado' })
    }, [ error ]);

    const handleRegister = ({ name, email, password }) => {
        dispatch( registerUser({ name, email, password }) );
    };

    if ( status === 'loading' ) {
        return <Loader />;
    }

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
