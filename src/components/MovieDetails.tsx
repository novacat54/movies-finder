import { Item } from '../redux/dataTypes';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMovie } from '../redux/moviesSlice';
import { useEffect } from 'react';

function MovieDetails() {

let movie = {} as Item;  

const dispatch = useAppDispatch();

const location = useLocation();
const id = location.pathname.slice(9);
console.log('Id ' + id);

const {moviesListFromIMDB, selectedMovie} = useAppSelector(state => state.movies);

useEffect(() => {
  if ( moviesListFromIMDB.find(item => item.id == id)?.id != '' && selectedMovie.id != id){
    dispatch(getMovie(id));
  }
}, [selectedMovie])

  return (
    <div>
      {/* <img src={getCorrectMovie.image}></img> */}
      {selectedMovie.id == id ? <h1>{selectedMovie.title}</h1> : moviesListFromIMDB.find(item => item.id == id)?.title ?
      <h1>{moviesListFromIMDB.find(item => item.id == id)?.title}</h1> : <h1>Not Found!</h1>} 
    </div>
  )
}

export default MovieDetails;