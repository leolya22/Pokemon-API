import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';


const PokemonEdit = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { uid } = useSelector( state => state.auth.user );
    const { name } = useParams();
    const [ newHeight, setNewHeight ] = useState( pokemon?.height || '' );
    const [ newWeight, setNewWeight ] = useState( pokemon?.weight || '' );
    const [ newAbilities, setNewAbilities ] = useState( pokemon?.abilities || [] );

    const handleHeightChange = ( e ) => {
        setNewHeight( e.target.value );
    };

    const handleWeightChange = ( e ) => {
        setNewWeight( e.target.value );
    };

    const handleAbilitieNameChange = ( e ) => {
        const abilitiesList = newAbilities
        abilitiesList.map( ( ability, index ) => {
            const descriptor1 = Object.getOwnPropertyDescriptor(ability, 'name');
            console.log(descriptor1);
            if( index == e.target.name ) ability.name = e.target.value;
        })
        setNewAbilities( abilitiesList );
    };
    const handleAbilitieHiddenChange = ( e ) => {
        console.log(e.target.checked);
        const abilitiesList = newAbilities.map( ( ability, index ) => {
            if( index == e.target.id ) ability.is_hidden = e.target.checked
        })
        setNewAbilities( abilitiesList );
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
        <div>
            <h1>Modificar Pokémon - { name }</h1>
            <label>
                Altura:  
                <input type="text" value={ newHeight } onChange={ handleHeightChange } />
            </label>
            <br />
            <label>
                Peso:  
                <input type="text" value={ newWeight } onChange={ handleWeightChange } />
            </label>
            <br />
            <ul>
                Habilidades:
                { newAbilities.map( (ability, index) => {
                    return  <li key={index}>
                                <label>
                                    Habilidad { index + 1 }:  
                                    <input type="text" name={index} value={ ability.name } onChange={ handleAbilitieNameChange } />
                                </label>
                                <label>
                                    Is hidden:  
                                    <input type="radio" id={index} checked={ ability.is_hidden } onChange={ handleAbilitieHiddenChange } />
                                </label>
                            </li>
                })
                }
                <li>
                    <label></label>
                </li>
            </ul>
            <br />
            <button onClick={ handleUpdatePokemon }>Guardar Cambios</button>
            <br />
            <Link to={`/pokemon/${name}`}>Volver al Detalle</Link>
        </div>
    );
};

export default PokemonEdit;
