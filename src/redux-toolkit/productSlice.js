import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"productData",
    initialState:{
        imgData:null,
    },
    reducers:{
        imagePageData:(state,action) => {
            state.imgData = action.payload
        }
    }
  
})

export const { imagePageData } = productSlice.actions

export default productSlice.reducer