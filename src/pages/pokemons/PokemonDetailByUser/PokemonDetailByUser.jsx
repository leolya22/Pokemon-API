import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './PokemonDetailByUser.module.css'
import Loader from '../../../components/Loader/Loader';
import { PokemonInfo } from '../../../components/PokemonInfo/PokemonInfo';
import { deletePokemon } from '../../../redux/pokemon/thunks';


const PokemonDetailByUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pokemonsByUser, status } = useSelector( state => state.pokemons );
    const { uid } = useSelector( state => state.auth.user );
    const { index } = useParams();
    const [ contentVisible, setContentVisible ] = useState(true);

    const borrarPokemon = async () => {
        await dispatch( deletePokemon({ id: pokemonsByUser[index].id, uid }) );
        navigate('/myPokemons');
    }

    if ( status === 'loading' ) {
        return <Loader />;
    }

        return (
            <div className={ styles.pokemon }>
                <PokemonInfo 
                    pokemon={ pokemonsByUser[index] } 
                    setContentVisible={ setContentVisible } 
                    contentVisible={ contentVisible } 
                />
                <div className={ styles.flex }>
                    <Link className={ styles.botones } to='/myPokemons'>Volver</Link>
                    { contentVisible 
                        ? <p className={ styles['botones-disabled'] }>Borrar Pokemon</p>
                        : <button className={ styles.botones } onClick={ borrarPokemon }>Borrar Pokemon</button>
                    }
                </div>
            </div>
        );
};

export default PokemonDetailByUser;
