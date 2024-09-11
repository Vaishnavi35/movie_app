import React, { useContext, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popularMovieList, searchMovie } from '../api/endPoints';
import { fetchData } from '../api/apiActions';
import { MovieCard } from './MovieCard';
import "../Styles/MovieCard.scss";
import { SearchContext } from '../context/SearchContext';

export const MovieList = () => {
    const dispatch = useDispatch();
  const {isLoading, movie_list, error} = useSelector((state) => state.api);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const {searchValue} = useContext(SearchContext);
  const defferedSearch = useDeferredValue(searchValue);
//   console.log('ddata loaded : ' , movieList);
  console.log('MovieList render');
  const params = {
        query: searchValue.movie,
        genre: searchValue.genre.map((value) => value.id),
        primary_release_year: searchValue.releaseYear,
        'vote_average.gte': searchValue.ratingFrom,
        'vote_average.lte': searchValue.ratingTo,
        page: page,
        sort_by: 'popularity.desc',
        include_adult: false
    }

    

    useEffect(() => {
        // console.log('searchValue : ' , searchValue);
        setMovieList([]);
        // if(page > 1 &&){

        // }
        // if(page > 1){
            setPage(1);
        // }
        if(searchValue.movie && page == 1){
            getMovieListByList();
        }
    },[searchValue.movie]);

    useEffect(() => {
        console.log('useEffect page : ' );
        getMovieListByList();
    },[dispatch, page]);

    const mapFavMovies = useMemo(() => {
        if(movie_list && movie_list?.results?.length > 0){
            const list = movie_list.results.map((item) => { return { ...item, fav: false}});
            const favoriteMovies = JSON.parse(localStorage.getItem('favorite_movies') || '[]');
            return list.map((item) => {
                const favValue = favoriteMovies.find((favItem) => item.id === favItem.id);
                return { ...item, fav: favValue? true: false};
            })
        }
    },[movie_list]);

    useEffect(() => {
        // console.log('data results: ' , data);
        if(movie_list && movie_list?.results?.length > 0){
            // const list = mapFavMovies();
            console.log('mapFavMovies: ' , mapFavMovies);
            
            setMovieList((prev) => [...prev, ...mapFavMovies]);
            setTotalPages(movie_list.total_pages);
        }
    },[movie_list]);

    const getMovieList = () => {
        console.log('getMovieList triggered');
        if(page < totalPages){
            setPage((prev) => prev + 1);
        }
    }

    // useEffect(() => {
    //     console.log('search value changed: ', searchValue.movie, ' deffered value changed: ', searchValue.movie);
        
    // },[searchValue.movie, searchValue.movie])

    const getMovieListByList = () => {
        if(searchValue.movie && searchValue.movie !== ''){
            const newParams = {
                query: searchValue.movie,
                genre: searchValue.genre,
                'release_date.gte': searchValue.releaseYearFrom,
                'release_date.lte': searchValue.releaseYearTo,
                'vote_average.gte' : searchValue.ratingFrom,
                'vote_average.lte': searchValue.ratingTo,
                ...params
             }
            dispatch(fetchData({url: searchMovie,params: newParams,type: 'get'}));
            
            // what about empty search string
        }else{
            dispatch(fetchData({url: popularMovieList,params,type: 'get'}));
        }

    }

  return (
    <div className='movie-card-container flex-wrap jc-ctr p-36 gap-20'>
        {
            movieList.length > 0 && 
             <MovieCard list={movieList} getMovieList={getMovieList}/>
        }
        {
            isLoading && <h2>Loading...</h2>
        }
    </div>
  )
}
