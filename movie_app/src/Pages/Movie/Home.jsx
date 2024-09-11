import React from 'react'
import { SearchBar } from '../../Components/SearchBar';
import '../../Styles/Home.scss';
import { MovieList } from '../../Components/MovieList';
import  {SearchProvider}  from '../../context/SearchContext';

export const Home = () => {

  return (
    <SearchProvider>
        <div className='home-page'>
            <section className='media-discover p-36'>
                <h1>Welcome.</h1>
                <h1>Millions of movies to discover. Explore now.</h1>
                <SearchBar />
            </section>
            <section>
                <MovieList/>
            </section>
        </div>
    </SearchProvider>
  )
}
