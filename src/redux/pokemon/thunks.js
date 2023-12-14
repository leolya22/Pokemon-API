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
        console.log(response);
        return response.data;
    } catch (error) {
        console.log( error );
    }
});