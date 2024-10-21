import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { charactersReducer } from "../features/Characters/Characters.slice";
import { currentInfoReducer } from "../features/ShowData/ShowData.slice";

const rootReducer = combineReducers({
    characters:charactersReducer,
    currentInfo:currentInfoReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch