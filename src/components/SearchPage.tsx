import SearchPageCss from './SearchPage.module.css';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function SearchPanel() {

  const [dropdownValue, setDropdownValue ] = useState("Select genre"); 

  let location = useLocation();
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('genres')){
      setDropdownValue("Select genre");
    }
    if(searchParams.get('genres') && dropdownValue!==searchParams.get('genres')){
      setDropdownValue(searchParams.get('genres')!);
    }
  }, [searchParams]);

  const enterKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target.value !== "") {
      searchParams.set('title', event.target.value);
      setSearchParams([...searchParams.entries()]);
      if (location.pathname !== '/'){
        navigate("/?"+ searchParams);
      }
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
      setDropdownValue(event.target.value);
      searchParams.set('genres', event.target.value);
      setSearchParams([...searchParams.entries()]);
      if (location.pathname !== '/'){
        navigate("/?" + searchParams);
      }
    }
    else{
      if (searchParams.get('genres')){
         searchParams.delete('genres');
         setSearchParams([...searchParams.entries()]);
         setDropdownValue("Select genre");
      }
    }
  }

  return (
    <div className={SearchPageCss.searchComponents}>
      <div>
        <input className={SearchPageCss.searchField} placeholder='Search for a movie...' onKeyPress={enterKeyPressed}></input>
      </div>

      <select className={SearchPageCss.genres} value={dropdownValue} name="genres" id="genres" onChange={handleGenreChange}>
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