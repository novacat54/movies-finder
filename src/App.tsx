import './App.css';
import SearchPage from './components/SearchPage';
import { getMovies } from './redux/moviesSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import MoviesList from './components/MoviesList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const { errorMessage, moviesListFromIMDB, loading } = useAppSelector(state => state.movies)

  console.log(moviesListFromIMDB);
  console.log("Error message is " + errorMessage)

  const Loading = () => {
    return (
    <h1>Loading...</h1>
    )
  }

  return (
    <Router>
      <div className="App">
      <SearchPage/>
      {loading ? <Loading/> : (
        <Routes>
          {/* {!loading ? <MoviesList /> : <h1>Loading...</h1>} */}
          <Route path="/" element={<MoviesList/>} />
          <Route path='/movieName/:name' element={<MoviesList/>}/>
          <Route path="/movieId/:id" element={<MovieDetails/>}/>
        </Routes>
      )}
      </div>
    </Router>
  );
}

export default App;
