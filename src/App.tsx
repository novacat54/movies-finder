import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import MoviesList from './components/MovieList/MoviesList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { useAppSelector } from './redux/hooks';
import ErrorMessage from './components/Helpers/ErrorMessage';


function App() {

  const { errorMessage } = useAppSelector(state => state.movies);

  return (
    <Router>
      <div className="App">
        <SearchPanel />
        {errorMessage !== '' && errorMessage !== null ?
          <ErrorMessage message={errorMessage} /> : (
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/movieId/:id" element={<MovieDetails />} />
            </Routes>
          )}
      </div>
    </Router>
  );
}

export default App;
