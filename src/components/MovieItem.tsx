import { Item } from '../redux/dataTypes';
import MovieItemCss from './MovieItem.module.css';

function MovieItem(props = {movie:{} as Item}) {

  let backgroundImageUrl = `url(${props.movie.image})`;

  return(
  <div className={MovieItemCss.movieItem} style={{backgroundImage: backgroundImageUrl}}>
    <h2>{props.movie.title}</h2>
    <h3>{props.movie.imDbRating}</h3>
  </div>)
}

export default MovieItem;