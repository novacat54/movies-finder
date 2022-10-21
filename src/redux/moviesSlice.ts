import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesInTheaters, getMoviesBySearchParams, getMovieById } from "../api/IMDBApiService";
import { memoize } from "../helpers/cache";
import type { Movie } from './dataTypes';

const memMoviesInTheaters = memoize(getMoviesInTheaters);
const memSearchByParams = memoize(getMoviesBySearchParams);
const memMovieById = memoize(getMovieById);

export const inTheaters = createAsyncThunk("moviesInTheaters/getMoviesInTheaters", async() => {
    return memMoviesInTheaters("default");
})

export const moviesBySearchParams = createAsyncThunk("moviesByParams/getMoviesByParams", async (genre:string) => {
  return memSearchByParams(genre);
})

export const getMovie = createAsyncThunk('movie/getMovie', async (movieId: string) => {
  return memMovieById(movieId);
})

const moviesSlice = createSlice(({
  name: 'movies',
  initialState: {
    errorMessage: "",
    moviesListFromAPI: [] as Movie[],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(inTheaters.pending, (state) => {
        state.loading = true;
      })
      .addCase(inTheaters.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesListFromAPI = action.payload.items || action.payload.results;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(inTheaters.rejected, (state) => {
        state.loading = false
      })
      .addCase(moviesBySearchParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(moviesBySearchParams.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesListFromAPI = action.payload.items || action.payload.results;
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(moviesBySearchParams.rejected, (state) => {
        state.loading = false
      })
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        //This section is needed, because in some cases many movies does not include plot.
        //In such case additionla call with advanced search is done.
        if (!!state.moviesListFromAPI.find(x => x.id === action.payload.id)){
          state.moviesListFromAPI = state.moviesListFromAPI.filter(x => x.id!==action.payload.id);
        }
        state.moviesListFromAPI.push(action.payload);
        state.moviesListFromAPI = state.moviesListFromAPI.map(x => Object.assign({}, x));
        state.errorMessage = action.payload.errorMessage;
      })
      .addCase(getMovie.rejected, (state) => {
        state.loading = false
      })
  }
}))

export const moviesReducer = moviesSlice.reducer;