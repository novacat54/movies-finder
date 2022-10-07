import { MovieItemProps } from '../redux/dataTypes';
import MovieItemCss from './MovieItem.module.css';
import { Link } from 'react-router-dom';

function MovieItem(props: MovieItemProps) {

  let backgroundImageUrl = `url(${props.movie.image})`;

  return (
    <div>
      <Link to={`/movieId/${props.movie.id}`} className={MovieItemCss.movieDetailsLink}>
        <div className={MovieItemCss.movieItem} style={{ backgroundImage: backgroundImageUrl }}>
          <h2 className={MovieItemCss.movieTitle}>{props.movie.title}</h2>
          <h3 className={MovieItemCss.movieRating}>{props.movie.imDbRating}</h3>
        </div>
      </Link>
    </div>
  )
}

export default MovieItem;