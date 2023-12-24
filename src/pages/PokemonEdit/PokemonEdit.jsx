import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import styles from './PokemonEdit.module.css'


const PokemonEdit = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { uid } = useSelector( state => state.auth.user );
    const { name } = useParams();
    const [ newHeight, setNewHeight ] = useState( pokemon?.height || '' );
    const [ newWeight, setNewWeight ] = useState( pokemon?.weight || '' );
    const [ newAbilities, setNewAbilities ] = useState( pokemon?.obj_abilities || {} );


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

    const handleUpdatePokemon = async () => {
        dispatch(
            updatePokemonAsync({
                name,
                height: newHeight,
                weight: newWeight,
                abilities: newAbilities.map( ability => ({ ability: { name: ability } })),
                uid,
            })
        );
    };

    if ( status === 'loading' ) {
        return <Loader />;
    }

    return (
        <div className={ styles.pokemon }>
            <h1 className={ styles.texto }>Modificar Pokemon - <b>{ name }</b></h1>
            <div className={ styles['anim-border'] }>
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
                <br />
                <ul>
                    <h3 className={ styles.habilidades }>Habilidades:</h3>
                    { Object.keys( newAbilities ).map( ability => (
                        <li key={ ability }>
                            <label className={ styles.label }>
                                Habilidad { +ability + 1 }:  
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
                        </li>
                    ))}
                </ul>
                <div className={ styles.flex }>
                    <button className={ styles.botones } onClick={ handleUpdatePokemon }>Guardar Cambios</button>
                    <Link className={ styles.botones } to={`/pokemon/${name}`}>Volver al Detalle</Link>
                </div>
            </div>
        </div>
    );
};

export default PokemonEdit;
