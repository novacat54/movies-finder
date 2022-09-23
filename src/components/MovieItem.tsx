import { Item } from '../redux/dataTypes';
import MovieItemCss from './MovieItem.module.css';
import { Link } from 'react-router-dom';

function MovieItem(props = { movie: {} as Item }) {

  let backgroundImageUrl = `url(${props.movie.image})`;

  return (
    <div>
      <Link to={`/movieId/${props.movie.id}`}>
        <div className={MovieItemCss.movieItem} style={{ backgroundImage: backgroundImageUrl }}>
          <h2>{props.movie.title}</h2>
          <h3>{props.movie.imDbRating}</h3>
        </div>
      </Link>
    </div>
  )
}

export default MovieItem;