import React from 'react';
import SearchPageCss from './SearchPage.module.css';
import {KeyboardEvent} from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getMovies } from '../redux/moviesSlice';

function SearchPage() {

  const dispatch = useAppDispatch();

  const enterKeyPressed = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key == 'Enter' && event.target.value !=""){
        dispatch(getMovies(event.target.value));
    }
  }

  return (
     <div className={SearchPageCss.searchComponents}>
        <div>
          <input className={SearchPageCss.searchField} placeholder='Search for a movie...' onKeyPress={enterKeyPressed}></input>
          <button className={SearchPageCss.searchButton}></button>
        </div>

        <select className={SearchPageCss.genres} name="genres" id="genres">
          <option value="Select genre">Select genre</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
        </select>
     </div>
  )
}

export default SearchPage;