import type {Item} from '../redux/dataTypes'
import MoviesListCss from './MoviesList.module.css'
import MovieItem from './MovieItem';
import { useAppSelector } from '../redux/hooks';

function MoviesList() {

  const moviesList = useAppSelector(state => state.movies.moviesListFromIMDB)

  return (
    <div className = {MoviesListCss.searchResultList}>
      {moviesList.map(movie => 
      <MovieItem key={movie.id} movie={movie}/>)}
    </div>
  )
};

export default MoviesList;