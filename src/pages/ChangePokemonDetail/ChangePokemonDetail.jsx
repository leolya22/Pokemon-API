import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const PokemonEdit = () => {
    const dispatch = useDispatch();
    const { pokemon, status } = useSelector( state => state.pokemons );
    const { name } = useParams();
    const [ newHeight, setNewHeight ] = useState(pokemon?.height || '');
    const [ newWeight, setNewWeight ] = useState(pokemon?.weight || '');
    const [ newAbilities, setNewAbilities ] = useState(
        pokemon?.abilities.map( habilidad => habilidad.ability.name ) || []
    );

    const handleHeightChange = (e) => {
        setNewHeight(e.target.value);
    };

    const handleWeightChange = (e) => {
        setNewWeight(e.target.value);
    };

    const handleAbilitiesChange = (e) => {
        const abilitiesList = e.target.value.split(',');
        setNewAbilities(abilitiesList);
    };

    const handleUpdatePokemon = async () => {
        dispatch(
            updatePokemonAsync({
                name,
                height: newHeight,
                weight: newWeight,
                abilities: newAbilities.map( ability => ({ ability: { name: ability } })),
            })
        );
        //CREAR EL REDUCER updatePokemon!!!
        dispatch( updatePokemon( updatedPokemon ) );
    };

    if ( status === 'loading' ) {
        return <div>Loading...</div>;
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
            <label>
                Habilidades (separadas por comas):
                <input type="text" value={ newAbilities.join(',') } onChange={ handleAbilitiesChange } />
            </label>
            <br />
            <button onClick={handleUpdatePokemon}>Guardar Cambios</button>
            <br />
            <Link to={`/pokemon/${name}`}>Volver al Detalle</Link>
        </div>
    );
};

export default PokemonEdit;
