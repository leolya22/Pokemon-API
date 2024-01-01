import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Loader from '../../../components/Loader/Loader';
import styles from './PokemonEdit.module.css'
import { updatePokemonAsync } from '../../../redux/pokemon/thunks';


const PokemonEdit = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { uid } = useSelector( state => state.auth.user );
    const { name } = useParams();
    const [ newHeight, setNewHeight ] = useState( pokemon?.height || '' );
    const [ newWeight, setNewWeight ] = useState( pokemon?.weight || '' );
    const [ newAbilities, setNewAbilities ] = useState( pokemon?.obj_abilities || {} );
    const navigate = useNavigate();


    const handleHeightChange = ( e ) => {
        setNewHeight( e.target.value );
    };

    const handleWeightChange = ( e ) => {
        setNewWeight( e.target.value );
    };

    const handleAbilitieHiddenChange = ( e, index ) => {
        if( e.target.type === 'checkbox' ) {
            setNewAbilities({ ...newAbilities, [ index ]: { ...newAbilities[ index ], is_hidden: e.target.checked }});
        } else {
            setNewAbilities({ ...newAbilities, [ index ]: { ...newAbilities[ index ], name: e.target.value }});
        }
    };

    const addAbility = () => {
        setNewAbilities({ ...newAbilities, [ +Object.keys( newAbilities ).length ]: { name: '', is_hidden: false }});
    }

    const handleUpdatePokemon = async () => {
        const { url } = pokemon;
        dispatch(
            updatePokemonAsync({
                name,
                height: newHeight,
                weight: newWeight,
                obj_abilities: newAbilities,
                uid,
                url
            })
        );
        navigate('/myPokemons');
    };
    
    const pokemonCompleted = !!newHeight && !! newWeight 
    && Object.keys( newAbilities ).map( ability => newAbilities[ ability ].name == '').indexOf(true) == -1

    if ( status === 'loading' ) {
        return <Loader />;
    }

    return (
        <div className={ styles.pokemon }>
            <h1 className={ styles.texto }>Modificar Pokemon</h1>
            <div className={ styles['anim-border'] }>
                <h2><b>{ name }</b></h2>
                <label className={ styles.label }>
                    Altura:  
                    <input 
                        type="text" 
                        value={ newHeight } 
                        onChange={ handleHeightChange } 
                        className={ styles.input }
                    />
                </label>
                <br />
                <label className={ styles.label }>
                    Peso:  
                    <input 
                        type="text" 
                        value={ newWeight } 
                        onChange={ handleWeightChange }
                        className={ styles.input }
                    />
                </label>
                <h3 className={ styles.habilidades }>Habilidades:</h3>
                <ul className={ styles.list }>
                    { 
                        Object.keys( newAbilities ).map( ability => (
                            <li className={ styles.li } key={ ability }>
                                <h4>Habilidad { +ability + 1 }:</h4>
                                <div className={ styles.habilidad }>
                                    <label className={ styles.label }>
                                        <input 
                                            type="text" 
                                            value={ newAbilities[ ability ].name } 
                                            onChange={ e => handleAbilitieHiddenChange( e, ability ) } 
                                            className={ styles.input } 
                                        />
                                    </label>
                                    <label className={ styles.label }>
                                        Is hidden:  
                                        <input 
                                            type="checkbox" 
                                            checked={ newAbilities[ ability ].is_hidden } 
                                            onChange={ e => handleAbilitieHiddenChange( e, ability ) }
                                            className={ styles.input } 
                                        />
                                    </label>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                { 
                    pokemonCompleted || <p className={ styles.error }>Por favor complete los campos faltantes!</p> 
                }
                { !pokemonCompleted 
                    ? 
                        <>
                            { Object.keys( newAbilities ).length < 6 
                                ?
                                    <button className={ styles['botones-disabled']} >
                                        Agregar habilidad
                                    </button>
                                :
                                    <button className={ styles['botones-disabled']} >
                                        Maximo de hablidades alcanzado
                                    </button>
                            }
                            <div className={ styles.flex }>
                                <button className={ styles['botones-disabled']} >
                                    Guardar Cambios
                                </button>
                                <Link className={ styles.botones } to={`/pokemon/${name}`}>Volver al Detalle</Link>
                            </div>
                        </>
                    : 
                        Object.keys( newAbilities ).length < 6 
                            ?
                                <>
                                    <button className={ styles.botones } onClick={ addAbility } >
                                        Agregar habilidad
                                    </button>
                                    <div className={ styles.flex }>
                                        <button className={ styles.botones } onClick={ handleUpdatePokemon } >
                                            Guardar Cambios
                                        </button>
                                        <Link className={ styles.botones } to={`/pokemon/${name}`}>Volver al Detalle</Link>
                                    </div>
                                </>
                            :
                                <>
                                    <button className={ styles['botones-disabled']} >
                                        Maximo de hablidades alcanzado
                                    </button>
                                    <div className={ styles.flex }>
                                        <button className={ styles.botones } onClick={ handleUpdatePokemon } >
                                            Guardar Cambios
                                        </button>
                                        <Link className={ styles.botones } to={`/pokemon/${name}`}>Volver al Detalle</Link>
                                    </div>
                                </>
                }
            </div>
        </div>
    );
};

export default PokemonEdit;
