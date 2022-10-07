import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesInTheaters, getMoviesByGenreOnly, getMoviesBySearchTitle, getMovieById } from "../api/IMDBApiService";
import type { Item, RequestParams } from './dataTypes';



export const getMovies = createAsyncThunk("movies/getMovies", async ({ searchMovie = '', genre = '' }: RequestParams) => {
  if (searchMovie !== '') {
    return getMoviesBySearchTitle(searchMovie);
  }

  else if (genre !== '') {
    return getMoviesByGenreOnly(genre);
  }
  else {
    return getMoviesInTheaters();
  }
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
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesListFromIMDB = action.payload.items || action.payload.results;
        state.expression = action.payload.expression || undefined;
        state.errorMessage = action.payload.errorMessage;
        state.queryString = action.payload.queryString || undefined;
      })
      .addCase(getMovies.rejected, (state) => {
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