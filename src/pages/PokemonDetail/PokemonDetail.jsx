import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './PokemonDetail.module.css'
import { fetchPokemonDetail } from '../../redux/pokemon/thunks';
import Loader from '../../components/Loader/Loader';


const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { name } = useParams();
    const [ contentVisible, setContentVisible ] = useState(true);

    useEffect(() => {
        dispatch( fetchPokemonDetail( name ) );
    }, []);

    const handleContentToggle = () => {
        setContentVisible( false );
    };

    if ( status === 'loading' ) {
        return <Loader />;
    }

        return (
            <div className={ styles.pokemon }>
                <h1 className={ styles.texto }>Dar click para ver detalle: </h1>
                <div className={ styles['anim-border'] }
                    onClick={handleContentToggle} 
                >
                    <img className={ styles.coverImage } 
                        style={{ visibility: contentVisible ? 'visible' : 'hidden', position: 'absolute' }}
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg" 
                        alt="pokemon card" 
                    />
                    <h2 className={styles.borderAnimation}>{ name }</h2>
                    <img src={ pokemon?.front_default } alt={ name } />
                    <p>Altura: { pokemon?.height }</p>
                    <p>Peso: { pokemon?.weight }</p>
                    <h3 className={ styles.habilidades }>Habilidades</h3>
                    <ul>
                        { pokemon?.abilities.map( habilidad => {
                            return habilidad.is_hidden 
                            ? <li className={ styles.habilidadOculta } 
                                key={ habilidad.name }
                            >
                                { habilidad.name }
                            </li>
                            : <li key={ habilidad.name }>
                                { habilidad.name }
                            </li>
                        })}
                    </ul>
                </div>
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
