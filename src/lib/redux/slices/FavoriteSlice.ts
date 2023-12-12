import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Character {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface FavoriteState {
    favCharacters: Character[]
}


const initialState: FavoriteState = {
    favCharacters: []
}

export const favoritesSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorites: (state) => {
            const favorites = localStorage.getItem("favorites")
            if (favorites) {
                state.favCharacters = JSON.parse(favorites)
            }
        },
        addFavorite: (state, action: PayloadAction<Character>) => {
            state.favCharacters = [...state.favCharacters, action.payload]
            localStorage.setItem("favorites", JSON.stringify(state.favCharacters))
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favCharacters = state.favCharacters.filter((fav) => fav.id !== action.payload)
            localStorage.setItem("favorites", JSON.stringify(state.favCharacters))
        },
    },
})

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer