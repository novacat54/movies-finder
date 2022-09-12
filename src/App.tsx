import './App.css';
import SearchPage from './components/SearchPage';
import { getMovies } from './redux/moviesSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import MoviesList from './components/MoviesList';


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const { errorMessage, moviesListFromIMDB, loading } = useAppSelector(state => state.movies)

  console.log(moviesListFromIMDB);
  console.log("Error message is " + errorMessage)

  return (
    <div className="App">
      <SearchPage />
      {!loading ? <MoviesList/> : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
