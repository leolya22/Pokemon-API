import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemonList = createAsyncThunk( 'pokemon/fetchPokemonList', async () => {
    try {
        const response = await axios.get( 'https://pokeapi.co/api/v2/pokemon?limit=100' );
        return response.data.results;
    } catch ( error ) {
        console.log( error );
    }
});

export const fetchPokemonDetail = createAsyncThunk( 'pokemon/fetchPokemonDetail', async ( pokemonName ) => {
    try {
        const response = await axios.get( `https://pokeapi.co/api/v2/pokemon/${pokemonName}` );
        const { abilities, height, id, weight } = response.data;
        const { front_default } = response.data.sprites;
        abilities.forEach( ability => { 
            delete ability.slot;
            ability.name = ability.ability.name;
            delete ability.ability;
        });

        return {
            abilities,
            height,
            id,
            pokemonName,
            weight,
            front_default
        }
    } catch (error) {
        console.log( error );
    }
});
//HACER EL FETCH DE LOS POKEMONES MODIFICADOS EN FIREBASE!!!

export const updatePokemonAsync = createAsyncThunk(
    'pokemons/updatePokemon',
    async ({ name, height, weight, abilities, uid }) => {
        try {
            const firebaseRef = firebase.database().ref(`${ uid }/pokemons/${ name }`);
            await firebaseRef.update({ name, height, weight, abilities });
            return { name, height, weight, abilities };
        } catch ( error ) {
            console.log( error );
        }
    }
);