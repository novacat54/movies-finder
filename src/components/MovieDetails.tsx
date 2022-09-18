import { Item } from '../redux/dataTypes';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMovie } from '../redux/moviesSlice';
import { useEffect } from 'react';
import MovieDetailsCss from './MovieDetails.module.css';

function MovieDetails() {

  let movie = {} as Item;

  const dispatch = useAppDispatch();

  const location = useLocation();
  const id = location.pathname.slice(9);
  console.log('Id ' + id);

  const { moviesListFromIMDB, selectedMovie } = useAppSelector(state => state.movies);

  const movieExistInList = moviesListFromIMDB.find(item => item.id == id);

  useEffect(() => {
    console.log(movieExistInList?.plot);
    if ((movieExistInList?.id != id || movieExistInList?.plot == undefined ) && selectedMovie.id != id) {
      debugger;
      dispatch(getMovie(id));
    }
  }, [selectedMovie])

  const MovieDescription = (props = { movie:{} as Item}) => {
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

  return (
    <div className={MovieDetailsCss.mainContainer}>
      {selectedMovie.id == id ? <MovieDescription movie = {selectedMovie}/> :
        movieExistInList?.title ?
        <MovieDescription movie = {movieExistInList} /> : 
        <h1>Not Found!</h1>
      }
    </div>
  )
}

export default MovieDetails;