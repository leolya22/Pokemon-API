import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPokemonList } from '../../redux/pokemon/thunks';
import styles from './PokemonList.module.css'
import UserMenu from '../../components/UserMenu';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector( state => state.pokemons );

    useEffect(() => {
        dispatch( fetchPokemonList() );
    }, []);

    if ( status === 'loading' ) {
        return <div>Loading...</div>;
    }

    return (
        <div className={ styles.principalPage }>
            <UserMenu/>
            <h1 className={ styles.title }>Listado de Pokemons</h1>
            <div className={ styles.pokemonList }>
                {list.map( pokemon => (

                    <div key={ pokemon.name } className={ styles.pokemon }>
                        <Link to={ `/pokemon/${pokemon.name}` }>
                            <h2>{ pokemon.name }</h2>
                            <img src={
                                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.
                                url.split('/').reverse()[1]}.png`
                                } 
                                alt={pokemon.name} 
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
