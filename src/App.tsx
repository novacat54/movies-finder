import './App.css';
import SearchPanel from './components/SearchPage';
import MoviesList from './components/MoviesList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import { useAppSelector } from './redux/hooks';
import ErrorMessage from './components/ErrorMessage';


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
