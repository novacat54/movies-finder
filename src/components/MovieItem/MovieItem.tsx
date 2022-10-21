import { MovieItemProps } from '../../redux/dataTypes';
import styles from './MovieItem.module.css';
import { Link } from 'react-router-dom';

function MovieItem(props: MovieItemProps) {

  let backgroundImageUrl = `url(${props.movie.image})`;

  return (
    <Link to={`/movieId/${props.movie.id}`} className={styles.movieDetailsLink}>
      <div className={styles.movieItem} style={{ backgroundImage: backgroundImageUrl }}>
        <h2 className={styles.movieTitle}>{props.movie.title}</h2>
        <p className={styles.movieRating}>⭐️{props.movie.imDbRating}</p>
      </div>
    </Link>
  )
}

export default MovieItem;