import { configureStore } from "@reduxjs/toolkit";
import { photosReducer } from "./slices/photos";

const store = configureStore({
    reducer: {
        photos: photosReducer
    }
});

export default store;
