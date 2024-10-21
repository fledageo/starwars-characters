import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { IState } from "./types"
import { fetchInfoByURL } from "../../lib/api";

export const getInfoByURL = createAsyncThunk(
    "info/getInfo",
    async (url: string) => {
        return await fetchInfoByURL(url)
    }
);

const initialState: IState = {
    type: null,
    data: null,
    complexData: null
}

const currentInfoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setType(state,action){
            state.type = action.payload
        },
        setComplexData(state,action){
            state.complexData = action.payload
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getInfoByURL.fulfilled,(state,action) => {
                state.data = action.payload
            })
    }
})

export const currentInfoReducer = currentInfoSlice.reducer
export const {setType,setComplexData} = currentInfoSlice.actions 