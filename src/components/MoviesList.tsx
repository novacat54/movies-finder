import MoviesListCss from './MoviesList.module.css'
import MovieItem from './MovieItem';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getMovies } from '../redux/moviesSlice';
import Loading from './Loading';

function MoviesList() {

  const dispatch = useAppDispatch();
  let { movieName, moviesGenre } = useParams();

  const { loading, moviesListFromIMDB, expression, queryString } = useAppSelector(state => state.movies);

  useEffect(() => {
    if (movieName !== undefined && expression !== movieName) {
      dispatch(getMovies({ searchMovie: movieName, genre: '' }));
    }
    if (moviesGenre !== undefined && (queryString === undefined || !queryString.includes(moviesGenre))) {
      dispatch(getMovies({ searchMovie: '', genre: moviesGenre }));
    }

    if (movieName === undefined && moviesGenre === undefined) {
      if (moviesListFromIMDB.length === 0) {
        dispatch(getMovies({ searchMovie: '', genre: '' }));
      }
      if (moviesListFromIMDB.length > 0 && (expression?.length > 0 || queryString?.length > 0)) {
        dispatch(getMovies({ searchMovie: '', genre: '' }));
      }
    }
  }, [movieName, moviesGenre]);

  return (
    <div>
      {loading ? <Loading /> :
        (
          <div className={MoviesListCss.searchResultList}>
            {moviesListFromIMDB.map(movie =>
              <MovieItem key={movie.id} movie={movie} />)}
          </div>
        )
      }
    </div>
  )
};

export default MoviesList;