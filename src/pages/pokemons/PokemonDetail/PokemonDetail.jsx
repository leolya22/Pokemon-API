import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './PokemonDetail.module.css'
import { fetchPokemonDetail } from '../../../redux/pokemon/thunks';
import Loader from '../../../components/Loader/Loader';
import { PokemonInfo } from '../../../components/PokemonInfo/PokemonInfo';


const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { name } = useParams();
    const [ contentVisible, setContentVisible ] = useState(true);

    useEffect(() => {
        dispatch( fetchPokemonDetail( name ) );
    }, []);

    if ( status === 'loading' ) {
        return <Loader />;
    }

        return (
            <div className={ styles.pokemon }>
                <PokemonInfo pokemon={ pokemon } setContentVisible={ setContentVisible } contentVisible={ contentVisible } />
                <div className={ styles.flex }>
                    <Link className={ styles.botones } to='/'>Volver</Link>
                    { contentVisible 
                        ? <p className={ styles['botones-disabled'] }>Editar Pokemon</p>
                        :<Link className={ styles.botones } to={`/pokemon/updateInfo/${ name }`}>Editar Pokemon</Link>
                    }
                </div>
            </div>
        );
};

export default PokemonDetail;
