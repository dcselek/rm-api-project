import { configureStore } from '@reduxjs/toolkit'
import { favoritesSlice } from './slices/FavoriteSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            favorites: favoritesSlice.reducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']