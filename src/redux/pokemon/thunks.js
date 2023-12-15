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