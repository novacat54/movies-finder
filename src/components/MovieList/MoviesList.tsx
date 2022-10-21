import styles from './MoviesList.module.css'
import MovieItem from '../MovieItem/MovieItem';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { inTheaters, moviesBySearchParams } from '../../redux/moviesSlice';
import Loading from '../Helpers/Loading';

function MoviesList() {

  const dispatch = useAppDispatch();

  const { loading, moviesListFromAPI } = useAppSelector(state => state.movies);
  const [ searchParams ] = useSearchParams();
  

  useEffect(() => {
      if(searchParams.toString() === ''){
        dispatch(inTheaters());
      }
      if(searchParams.get('genres') || searchParams.get('title')){
        dispatch(moviesBySearchParams(searchParams.toString()));
      }
    }, [searchParams]);

  return (
    <div>
      {loading ? <Loading /> : moviesListFromAPI.length === 0 ? 
      <h1>Nothing found, please search again with other parameters</h1> :
        (
          <div className={styles.searchResultList}>
            {moviesListFromAPI.map(movie =>
              <MovieItem key={movie.id} movie={movie} />)}
          </div>
        )
      }
    </div>
  )
};

export default MoviesList;