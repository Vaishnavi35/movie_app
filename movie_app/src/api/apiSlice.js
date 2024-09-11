import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    genres: null,
    movie_list: null,
}

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        fetchDataRequest(state) {
            // console.log('action fetchDataRequest: ', state);
            state.isLoading = true;
            state.error = null;
        },
        fetchDataSuccess(state, action) {
            state.isLoading = false;
            // console.log('action success: ', action.payload);
            state.data = action.payload;
        },
        fetchDataError(state, action) {
            // console.log('action fetchDataError: ', action);
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchGenresSuccess(state, action) {
            state.genres = action.payload.genres;
        },
        fetchMovieListSuccess(state, action) {
            // console.log('action fetchMovieListSuccess: ', action.payload);
            
            state.movie_list = action.payload;
        }
    }
});


export const { fetchDataRequest, fetchDataSuccess, fetchDataError, fetchGenresSuccess, fetchMovieListSuccess} = apiSlice.actions;

export default apiSlice.reducer;