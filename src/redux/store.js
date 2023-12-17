import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth/authSlice';
import pokemonReducer from "./pokemon/pokemonSlice";


export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
        auth: authReducer
    },
});
