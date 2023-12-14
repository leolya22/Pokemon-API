import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPokemonList } from '../redux/pokemon/thunks';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector( state => state.pokemon );

    useEffect(() => {
        if ( status === 'idle' ) {
        dispatch( fetchPokemonList() );
        }
    }, []);

    if ( status === 'loading' ) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Listado de Pokemons</h1>
                {list.map( pokemon => (
                    <div key={ pokemon.name }>
                        <Link to={ `/pokemon/${pokemon.name}` }>{ pokemon.name }</Link>
                    </div>
                ))}
        </div>
    );
};

export default PokemonList;
