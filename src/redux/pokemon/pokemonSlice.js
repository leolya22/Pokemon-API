import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonDetail, fetchPokemonList } from './thunks';

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        list: [],
        pokemon: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase( fetchPokemonList.pending, ( state ) => {
            state.status = 'loading';
        })
        .addCase( fetchPokemonList.fulfilled, ( state, action ) => {
            state.status = 'succeeded';
            state.list = action.payload;
        })
        .addCase( fetchPokemonList.rejected, ( state, action ) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase( fetchPokemonDetail.pending, ( state ) => {
            state.status = 'loading';
        })
        .addCase( fetchPokemonDetail.fulfilled, ( state, action ) => {
            state.status = 'succeeded';
            state.pokemon = action.payload;
        })
        .addCase( fetchPokemonDetail.rejected, ( state, action ) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default pokemonSlice.reducer;
