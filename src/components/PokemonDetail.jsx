import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetail } from '../redux/pokemon/thunks';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemon );
    const { name } = useParams();

    useEffect(() => {
        dispatch( fetchPokemonDetail( name ) );
    }, []);

    if ( status === 'loading' ) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{ pokemon?.name }</h1>
            <img src={ pokemon?.sprites.front_default } alt={ pokemon?.name } />
            <p>Altura: { pokemon?.height }</p>
            <p>Peso: { pokemon?.weight }</p>
        </div>
    );
};

export default PokemonDetail;
