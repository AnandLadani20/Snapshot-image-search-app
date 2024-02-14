import { configureStore } from "@reduxjs/toolkit"; 
// import productReducer from '../redux-toolkit/productSlice'
import searchReducer from '../redux-toolkit/searchSlice'
import productReducer from '../redux-toolkit/productSlice'

export default configureStore({
    reducer:{
        // product :productReducer
      queryParams:searchReducer,
      imageObj:productReducer

    }
})