import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesInTheaters, getMoviesBySearchParams, getMovieById } from "../api/IMDBApiService";
import type { Item, RequestParams } from './dataTypes';


export const inTheaters = createAsyncThunk("moviesInTheaters/getMoviesInTheaters", async() => {
    return getMoviesInTheaters();
})

export const moviesBySearchParams = createAsyncThunk("moviesByParams/getMoviesByParams", async (genre:string) => {
  return getMoviesBySearchParams(genre);
})

export const getMovie = createAsyncThunk('movie/getMovie', async (movieId: string) => {
  return getMovieById(movieId);
})

const moviesSlice = createSlice(({
  name: 'movies',
  initialState: {
    errorMessage: "",
    expression: "",
    moviesListFromIMDB: [] as Item[],
    selectedMovie: {} as Item,
    loading: false,
    queryString: "",
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(inTheaters.pending, (state) => {
        state.loading = true;
      })
      .addCase(inTheaters.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesListFromIMDB = action.payload.items || action.payload.results;
        state.expression = action.payload.expression || undefined;
        state.errorMessage = action.payload.errorMessage;
        state.queryString = action.payload.queryString || undefined;
      })
      .addCase(inTheaters.rejected, (state) => {
        state.loading = false
      })
      .addCase(moviesBySearchParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(moviesBySearchParams.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesListFromIMDB = action.payload.items || action.payload.results;
        state.expression = action.payload.expression || undefined;
        state.errorMessage = action.payload.errorMessage;
        state.queryString = action.payload.queryString || undefined;
      })
      .addCase(moviesBySearchParams.rejected, (state) => {
        state.loading = false
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
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