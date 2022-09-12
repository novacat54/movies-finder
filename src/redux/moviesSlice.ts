import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {Item} from './dataTypes';

const apiKey = "k_5ecdu34x";

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

const moviesSlice = createSlice(({
  name: 'movies',
  initialState: {
    errorMessage: "",
    moviesListFromIMDB: [] as Item[],
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

  }
}))

export const moviesReducer = moviesSlice.reducer;