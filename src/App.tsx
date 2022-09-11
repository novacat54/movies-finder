import './App.css';
import SearchPage from './components/SearchPage';
import { getPosts } from './redux/postSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import MoviesList from './components/MoviesList';


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const { response, loading } = useAppSelector(state => state.post)

  console.log(response);

  return (
    <div className="App">
      <SearchPage />
      {response.items.length === 0 ? '' : <MoviesList allMovies={response.items}/> }
    </div>
  );
}

export default App;
