import type {Item} from '../redux/dataTypes'
import MoviesListCss from './MoviesList.module.css'
import MovieItem from './MovieItem';
import { useAppSelector } from '../redux/hooks';

function MoviesList(props = {allMovies:[] as Item[]}) {

  //const movies = useAppSelector(state => state.post.response.items)

  return (
    <div className = {MoviesListCss.searchResultList}>
      {props.allMovies.map(movie => 
      <MovieItem movie={movie}/>)}
    </div>
  )
};

export default MoviesList;