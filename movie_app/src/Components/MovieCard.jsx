import React, { useRef, useCallback, useState, useEffect } from 'react';
import { format } from 'date-fns';
import heart from '../assets/images/heart_icon.png';
import heart_red from '../assets/images/heart_red.png';


export const MovieCard = ({ list, getMovieList, from = 'home' }) => {

    const [movieList, setMovieList] = useState([]);

    const observerRef = useRef();

    // console.log('list in MovieCard : ' , list);
    // console.log('movieList in MovieCard : ' , movieList);


    useEffect(() => {
        // console.log('list in MovieCard : ' ,list);
        
        setMovieList([...list]);
    }, [list]);


    const dateFormat = (date) => {
        let release_date;
        if(date){
            release_date = new Date(date);
        }else{
            release_date = new Date();
        }
        return format(release_date, 'MMM d, yyyy');
    }

    const lastItemRef = useCallback((node) => {
        
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
                getMovieList();
          }
        });
    
        if (node) observerRef.current.observe(node);
      }, [getMovieList]);

      const addFav = (index) => {
        // console.log('addFav triggered for id :'+ id);
        // list.map((item) => { if(item.id === id){item.fav = true;}});
        // setMovieList((prev) => [...prev, ]);
        setMovieList((prev) => {
            const list = [...prev];
            list[index] = {
                ...list[index],
                fav: true
            };
            localStorage.setItem('favorite_movies', JSON.stringify([...JSON.parse(localStorage.getItem('favorite_movies') || '[]'), list[index]]));
            return list;
        });
      }

      const clearFav = (index) => {
        if(from == 'fav'){
            setMovieList(movieList.filter((_, i) => index !== i));
        }else{
            setMovieList((prev) => {
                const list = [...prev];
                list[index] = {
                   ...list[index],
                    fav: false
                };
                return list;
            })
        }
        localStorage.setItem('favorite_movies', JSON.stringify(JSON.parse(localStorage.getItem('favorite_movies') || '[]').filter(item => item.id!== movieList[index].id)));
      }
    
    return (
        movieList &&
        (
            movieList.map((movie, index) => {
                return (
                    <div className='movie-card grid' key={`movie_${movie.id}_${index}`} ref={(index === movieList.length-1) && from == 'home' ? lastItemRef : null}>
                        <div className='relative'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='Movie poster' className='poster-img  br-8'/>
                            {
                                (movie.fav) ? <img src={heart_red} alt='Favorite Icon' className='absolute fav_icon cp' style={{opacity: 1}} onClick={(e) => clearFav(index)} title='Added to Favorite'/> : 
                                <img src={heart} alt='Favorite Icon' className='absolute fav_icon cp' onClick={(e) => addFav(index)} title='Add to Favorite'/>
                            }
                        </div>
                        <div className='grid'>
                            <p className='fs-20'>{movie.title}</p>
                            <p className='grey-text' style={{alignSelf: 'end'}}>{dateFormat(movie.release_date)}</p>
                        </div>

                    </div>)
            })

        )
    )
}
