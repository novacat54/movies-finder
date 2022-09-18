import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {Item} from './dataTypes';

const apiKey = "k_ycy5n819";

export const getMovies = createAsyncThunk("movies/getMovies", async(searchParameter:string = '') => {
  if (searchParameter !=''){
    return fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${searchParameter}`).then((res) => {
      return res.json();
    })
  }
  
  return fetch("https://imdb-api.com/en/API/InTheaters/" + apiKey).then((res) => {
    return res.json();
  })
})

export const getMovie = createAsyncThunk('movie/getMovie', async (movieId:string) => {
  return fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${movieId}`).then((res) => {
    return res.json();
  })
})

const moviesSlice = createSlice(({
  name: 'movies',
  initialState: {
    errorMessage: "",
    moviesListFromIMDB: [] as Item[],
    selectedMovie: {} as Item,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action)=> {
        state.loading = false; 
        state.moviesListFromIMDB = action.payload.items || action.payload.results;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(getMovies.rejected, (state) => {
        state.loading = false
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.fulfilled, (state, action)=> {
        state.loading = false; 
        state.selectedMovie = action.payload;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(getMovie.rejected, (state) => {
        state.loading = false
      })
  }
}))

export const moviesReducer = moviesSlice.reducer;