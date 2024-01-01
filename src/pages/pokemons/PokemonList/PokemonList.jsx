import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPokemonList } from '../../../redux/pokemon/thunks';
import styles from './PokemonList.module.css'
import NavBar from '../../../components/NavBar/NavBar';
import UserMenu from '../../../components/UserMenu/UserMenu';
import Loader from '../../../components/Loader/Loader';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector( state => state.pokemons );
    const [ limit, setLimit ] = useState( 100 );

    useEffect(() => {
        dispatch( fetchPokemonList( limit ));
    }, []);

    const handleLimitChange = (e) => {
        if( e.target.value > 1310 ){
            setLimit( 1310 );
        } else if( e.target.value <= 0 ){
            setLimit( 1 );
        } else {
            setLimit( e.target.value );
        }
    }

    const fetchWithLimitModified = () => {
        dispatch( fetchPokemonList( limit ));
    }

    if ( status === 'loading' ) {
        return <Loader />
    }

    return (
        <div className={ styles.principalPage }>
            <NavBar />
            <UserMenu />
            <h1 className={ styles.title }>Listado de Pokemones</h1>
            <label className={ styles.label }>
                    Cuantos pokemones quiere ver?  
                    <input 
                        type="number" 
                        value={ limit } 
                        onChange={ handleLimitChange } 
                        className={ styles.input }
                        step={ 10 }
                        minLength={ 2 }
                        max={ 1310 }
                    />
                    <button className={ styles.botones } onClick={ fetchWithLimitModified } >Buscar</button>
                </label>
            <div className={ styles.pokemonList }>
                {list.map( pokemon => (
                    <div key={ pokemon.name } className={ styles.pokemon }>
                        <Link 
                            to={ `/pokemon/${pokemon.name}` }
                            className={ styles.pokemonName }
                        >
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
