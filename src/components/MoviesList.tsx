import MoviesListCss from './MoviesList.module.css'
import MovieItem from './MovieItem';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { inTheaters, moviesBySearchParams } from '../redux/moviesSlice';
import Loading from './Loading';

function MoviesList() {

  const dispatch = useAppDispatch();
  let { movieName, moviesGenre } = useParams();

  const { loading, moviesListFromIMDB, expression, queryString } = useAppSelector(state => state.movies);
  const [ searchParams ] = useSearchParams();

  useEffect(() => {
      if(searchParams.toString() === ''){
        console.log(searchParams.toString());
        debugger;
        dispatch(inTheaters());
      }
      if(searchParams.toString() !==''){
        console.log(searchParams.toString());
        debugger;
        dispatch(moviesBySearchParams(searchParams.toString()));
      }
    }, [searchParams]);

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