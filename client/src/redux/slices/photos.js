import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPhoto = createAsyncThunk('photos/fetchPhotos', async () => {
    const { data } = await axios.get('/photos');
    console.log("photosData", data);
    return data;
});

const initialState = {
    photos: {
        items: [],
        status: 'loading'
    },
    category: {
        items: [],
        status: 'loading'
    }
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhoto.pending, (state) => {
                state.photos.items = [];
                state.photos.status = 'loading';
            })
            .addCase(fetchPhoto.fulfilled, (state, action) => {
                console.log("3",action.payload); 
                state.photos.items = action.payload;
                state.photos.status = 'loaded';
            })
            .addCase(fetchPhoto.rejected, (state, action) => {
                state.photos.items = [];
                state.photos.status = 'error';
            });
    }
});

export const photosReducer = photosSlice.reducer;
