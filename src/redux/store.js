import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon/pokemonSlice";

export const store = configureStore({
    reducer: {
        pokemons: pokemonReducer,
    },
});
