import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {MoviesResponse} from './dataTypes';

const apiKey = "k_5ecdu34x";

export const getPosts = createAsyncThunk("posts/getPosts", async() => {
  return fetch("https://imdb-api.com/en/API/InTheaters/"+apiKey).then((res) => {
    return res.json();
  })
})

const postsSlice = createSlice(({
  name: 'posts',
  initialState: {
    response: {errorMessage: "", items: []} as MoviesResponse,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action)=> {
        state.loading = false; 
        state.response = action.payload
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false
      })

  }
}))

export const postReducer = postsSlice.reducer;