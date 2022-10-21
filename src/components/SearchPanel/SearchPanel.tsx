import styles from './SearchPanel.module.css';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function SearchPanel() {

  const [dropdownValue, setDropdownValue ] = useState("Select genre"); 
  const [inputValue, setInputValue] = useState("");


  let location = useLocation();
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('genres')){
      setDropdownValue("Select genre");
    }
    if(searchParams.get('genres') && dropdownValue !== searchParams.get('genres')){
      setDropdownValue(searchParams.get('genres')!);
    }
    if(!searchParams.get('title')){
      setInputValue("");
    }
    if(searchParams.get('title') && inputValue !== searchParams.get('title')){
      setInputValue(searchParams.get('title')!);
    }
  }, [searchParams]);

  const enterKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target.value !== "") {
      setInputValue(event.target.value);
      searchParams.set('title', event.target.value);
      setSearchParams([...searchParams.entries()]);
      if (location.pathname !== '/'){
        navigate("/?"+ searchParams);
      }
    }
    if (event.key === 'Enter' && event.target.value === ""){
      if (searchParams.get('title')){
        setInputValue('');
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <div className={styles.searchComponents}>
      <div>
        <input className={styles.searchField} value={inputValue} onChange={handleInputChange} placeholder='Search for a movie...' onKeyPress={enterKeyPressed}></input>
      </div>

      <select className={styles.genres} value={dropdownValue} name="genres" id="genres" onChange={handleGenreChange}>
        <option value="Select genre">Select genre</option>
        <option value="comedy">Comedy</option>
        <option value="horror">Horror</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="thriller">Thriller</option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="mystery">Mystery</option>
        <option value="drama">Drama</option>
        <option value="fantasy">Fantasy</option>
        <option value="animation">Animation</option>
        <option value="crime">Crime</option>
        <option value="thriller">Thriller</option>
      </select>
    </div>
  )
}

export default SearchPanel;