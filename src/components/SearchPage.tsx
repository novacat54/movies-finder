import SearchPageCss from './SearchPage.module.css';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchPanel() {

  const [searchParams, setSearchParams] = useSearchParams();

  const enterKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target.value !== "") {
      searchParams.set('title', event.target.value);
      setSearchParams([...searchParams.entries()]);
    }
    if (event.key === 'Enter' && event.target.value === ""){
      if (searchParams.get('title')){
        searchParams.delete('title');
        setSearchParams([...searchParams.entries()]);
      }
    }
  }

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== "Select genre") {
      searchParams.set('genres', event.target.value);
      setSearchParams([...searchParams.entries()]);
    }
    else{
      if (searchParams.get('genres')){
         searchParams.delete('genres');
         setSearchParams([...searchParams.entries()]);
      }
    }
  }

  return (
    <div className={SearchPageCss.searchComponents}>
      <div>
        <input className={SearchPageCss.searchField} placeholder='Search for a movie...' onKeyPress={enterKeyPressed}></input>
      </div>

      <select className={SearchPageCss.genres} name="genres" id="genres" onChange={handleGenreChange}>
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

export default SearchPanel;