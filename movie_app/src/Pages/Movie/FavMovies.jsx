import React, { useEffect, useState } from 'react'
import { MovieCard } from '../../Components/MovieCard';
import { json } from 'react-router-dom';

export const FavMovies = () => {

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  useEffect(() => {
    setFavoriteMovies(JSON.parse(localStorage.getItem('favorite_movies')));
  },[]);

  return (
    <div className='movie-card-container flex-wrap jc-ctr p-36 gap-20'>
    {
        favoriteMovies && favoriteMovies.length > 0 && <MovieCard list={favoriteMovies} from='fav' />
    }
      
    </div>
  )
}
