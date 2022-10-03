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

  const { moviesListFromIMDB, selectedMovie, loading } = useAppSelector(state => state.movies);

  const movieExistInList = moviesListFromIMDB.find(item => item.id === id);

  useEffect(() => {
    if ((movieExistInList?.id !== id || movieExistInList?.plot === undefined) && selectedMovie.id !== id && id !== undefined) {
      dispatch(getMovie(id));
    }
  }, [selectedMovie])

  return (
    <div className={MovieDetailsCss.mainContainer}>
      {loading ? <Loading /> : selectedMovie.id === id ? <MovieDescription movie={selectedMovie} /> :
        movieExistInList?.title ?
          <MovieDescription movie={movieExistInList} /> :
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