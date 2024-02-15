import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../api/Api";

export const fetchMenuData = createAsyncThunk('search/fetchApiData', async ({ query, pageNo }) => {
    const url = `search/photos?page=${pageNo}&query=${query}&client_id=qVxHblnZCXiaFjTgMkAstQ12Oxd88yLXqp3CALrsknk`
    const response = await Api.get(url)
    return response.data.results
})

const searchSlice = createSlice({
    name: "search",
    initialState: {
        mainData: [],
        pageNo: 1,
        isLoading: false,
        error: null,

    },
    reducers: {
        pageIncrement: (state) => {
            state.pageNo += 1;

        },
        resetData: (state) => {
            state.mainData = [];
            state.pageNo = 1;
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchMenuData.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;

        })
        builder.addCase(fetchMenuData.fulfilled, (state, action) => {
            state.mainData = action.payload;
            state.isLoading = false

        })
        builder.addCase(fetchMenuData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;

        })

    }
})

export const { pageIncrement, resetData, imagePageData } = searchSlice.actions
export default searchSlice.reducer;