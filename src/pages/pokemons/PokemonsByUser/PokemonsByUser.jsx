import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../../components/Loader/Loader';
import NavBar from '../../../components/NavBar/NavBar';
import UserMenu from '../../../components/UserMenu/UserMenu';
import { fetchUpdatedPokemons } from '../../../redux/pokemon/thunks';
import styles from './PokemonsByUser.module.css'


const PokemonsByUser = () => {
    const { status, pokemonsByUser } = useSelector( state => state.pokemons );
    const { uid } = useSelector( state => state.auth.user );
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( fetchUpdatedPokemons( uid ) );
    }, []);


    if ( status === 'loading' ) {
        return <Loader />;
    }

    return (
        <div className={ styles.principalPage }>
            <NavBar />
            <UserMenu />
            <h1 className={ styles.title }>Tus Pokemones:</h1>
            <div className={ styles.pokemonList }>
                {pokemonsByUser.map( ( pokemon, index ) => (

                    <div key={ index } className={ styles.pokemon }>
                        <Link 
                            to={ `/my_pokemons/${ index }` }
                            className={ styles.pokemonName }
                        >
                            <h2>{ pokemon.name }</h2>
                            <img src={ pokemon.url } alt={pokemon.name} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonsByUser;
