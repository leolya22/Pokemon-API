import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import firebase from '../../config/firebase';


export const fetchPokemonList = createAsyncThunk( 'pokemon/fetchPokemonList', async ( limit = 100 ) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }`);
    return response.data.results;
});

export const fetchPokemonDetail = createAsyncThunk( 'pokemon/fetchPokemonDetail', async ( name ) => {
    const response = await axios.get( `https://pokeapi.co/api/v2/pokemon/${name}` );
    const { abilities, height, id, weight } = response.data;
    const { front_default: url } = response.data.sprites;
    abilities.forEach( ability => { 
        delete ability.slot;
        ability.name = ability.ability.name;
        delete ability.ability;
    });
    const obj_abilities = Object.assign({}, abilities);

    return {
        obj_abilities,
        height,
        id,
        name,
        weight,
        url
    }
});

export const fetchUpdatedPokemons = createAsyncThunk( 'pokemons/fetchUpdatedPokemons', async( uid ) => {
    const resp = await firebase.firestore().collection(`${uid}`).get();
    return resp.docs.map( pokemon => ({ id: pokemon.id, ...pokemon.data() }) );
});

export const updatePokemonAsync = createAsyncThunk(
    'pokemons/updatePokemon',
    async ({ name, height, weight, obj_abilities, uid, url }) => {        
        const response = await firebase.firestore().collection(uid).add({ name, height, weight, obj_abilities, url });
        return { name, height, weight, obj_abilities, id_pokemon: response.id, url };
    }
);

export const deletePokemon = createAsyncThunk(
    'pokemons/deletePokemon',
    async ({ id, uid }) => {
        return await firebase.firestore().collection( uid ).doc( id ).delete();
    }
);
