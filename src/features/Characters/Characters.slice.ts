import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetCharsResponse, ISearchPayload, IState } from "./types";
import { getCharactersApi, searchCharactersApi } from "../../lib/api";

export const getCharacters = createAsyncThunk(
    "characters/getCharacters",
    async (page: number): Promise<IGetCharsResponse> => {
        return await getCharactersApi(page);
    }
);

export const searchCharacters = createAsyncThunk(
    "characters/searchCharacters",
    async ({ value, page }: ISearchPayload) => {
        return await searchCharactersApi({ value, page });
    }
);

const initialState: IState = {
    list: [],
    charCount: 0,
    previousPage: null,
    currentPage: 1,
    nextPage: 2,
}



const charsListSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        changePage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        resetPage(state) {
            state.currentPage = 1
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getCharacters.fulfilled, (state, action: PayloadAction<IGetCharsResponse>) => {
                const { count, previous, next, results } = action.payload
                state.list = results
                state.charCount = count
                state.previousPage = previous ? state.currentPage - 1 : null
                state.nextPage = next ? state.currentPage - 1 : null
            })
            .addCase(searchCharacters.fulfilled, (state, action: PayloadAction<IGetCharsResponse>) => {
                const { count, previous, next, results } = action.payload
                state.list = results
                state.charCount = count
                state.previousPage = previous ? state.currentPage - 1 : null
                state.nextPage = next ? state.currentPage - 1 : null
            })
    }
})

export const charactersReducer = charsListSlice.reducer
export const { changePage,resetPage } = charsListSlice.actions