import { Item } from '../redux/dataTypes';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMovie } from '../redux/moviesSlice';
import { useEffect } from 'react';
import MovieDetailsCss from './MovieDetails.module.css';
import Loading from './Loading';

function MovieDetails() {

  let { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(state => state.movies);
  const selectedMovie = useAppSelector(state => state.movies.moviesListFromIMDB.find(item => item.id === id));

  useEffect(() => {
    if (selectedMovie?.id !== id || selectedMovie?.plot === null) {
      dispatch(getMovie(id!));
    }
  }, [selectedMovie])

  return (
    <div className={MovieDetailsCss.mainContainer}>
      {loading ? <Loading /> : selectedMovie ? <MovieDescription movie={selectedMovie} /> :
          <h1>Not Found!</h1>
      }
    </div>
  )
}

const MovieDescription = (props = { movie: {} as Item }) => {
  return (
    <div className={MovieDetailsCss.movieInfo}>
      <img className={MovieDetailsCss.movieImage} src={props.movie.image}></img>
      <div className={MovieDetailsCss.movieDescription}>
        <h1>{props.movie.title}</h1>
        <p>{props.movie.plot}</p>
        <p>IMDB rating: {props.movie.imDbRating}</p>
      </div>
    </div>
  )
}

export default MovieDetails;