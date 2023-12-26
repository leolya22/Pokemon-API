import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import firebase from '../../config/firebase';


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
        const obj_abilities = Object.assign({}, abilities);

        return {
            obj_abilities,
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
    async ({ name, height, weight, obj_abilities, uid }) => {
        try {
            const response = await firebase.firestore().collection(uid).add({ name, height, weight, obj_abilities });
            const id_pokemon = response.id
            return { name, height, weight, obj_abilities, id_pokemon };
        } catch ( error ) {
            console.log( error );
        }
    }
);

export async function deleteProduct(id) {
    const response = await firebase.firestore().collection("products").doc(id).delete();
    return response;
}
