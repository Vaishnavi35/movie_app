import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../context/SearchContext';
import { fetchData } from '../api/apiActions';
import { generList } from '../api/endPoints';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SearchBar = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const dispatch = useDispatch();
    const { isLoading, genres, error } = useSelector((state) => state.api);
    const [genersList, setGenresList] = useState([]);
    const [validationError, setValidationError] = useState({
        rating1Error: false,
        rating2Error: false,
        releaseYearFromError: false,
        releaseYearToError: false
    });
// console.log('searchvalue', searchValue);
// console.log('SearchBar render');

    useEffect(() => {
        dispatch(fetchData({ url: generList, params: '', type: 'get' }));
    }, [dispatch]);

    useEffect(() => {
        if(genres?.length > 0){
            setGenresList(genres);
            setSearchValue((prev) => ({
                ...prev,
                genre: [genres[0]]
            }));
        }
    }, [genres]);

    const searchValueChange = (e) => {
        const { name, value } = e.target;
        console.log('name : ' + name + ' value : ' + value);
        if(name === 'genre'){
            console.log();
            
            const selectedGenre = {
                id: value,
                name: genersList.find(genre => genre.id == value)?.name
            }
            setSearchValue((prev) => ({
                ...prev,
                [name]: [...prev.genre,selectedGenre]
            }));
        }else{
            setSearchValue((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        if (name == 'ratingFrom') {
            if (value > searchValue.ratingTo) {
                setValidationError((prev) => ({
                    ...prev, rating1Error: true
                }))
            } else {
                setValidationError((prev) => ({
                    rating2Error: false, rating1Error: false
                }))
            }
        }

        if (name == 'ratingTo') {
            if (value < searchValue.ratingFrom) {
                setValidationError((prev) => ({
                    ...prev, rating2Error: true
                }))
            } else {
                setValidationError((prev) => ({
                    rating1Error: false, rating2Error: false
                }))
            }
        }
    }

    const dateChange = (date, type) => {
        const year = date.getFullYear();
        // console.log('date selected : ', date);
        // console.log('year selected : ', year);
        // console.log('type selected : ', type);
        // console.log('year > searchValue.releaseYearTo : ', year > searchValue.releaseYearTo);
        
        if(type === 'releaseYearFrom'){
            if(year > new Date(searchValue.releaseYearTo).getFullYear()){
                setValidationError((prev) => ({
                    releaseYearFromError: true,
                    ...prev,
                }))
            }else{
                setValidationError((prev) => ({
                    releaseYearFromError: false,
                    releaseYearToError: false,
                    ...prev,
                }))
            }
        }else{
           if(year < new Date(searchValue.releaseYearFrom).getFullYear()) {
            setValidationError((prev) => ({
                releaseYearToError: true,
                ...prev,
            }))
           }else{
            setValidationError((prev) => ({
                releaseYearToError: false,
                releaseYearFromError: false,
                ...prev,
            }))
           }
        }

        setSearchValue((prev) => ({
            ...prev,
            [type]: year
        }));
    }

    const clearGenre = (id) => {
        // console.log('clear id : ', id);
        
        setSearchValue((prev) => ({
            ...prev,
            genre: prev.genre.filter(val => val.id != id)
        }))
    };

    return (
        <div className='search-container flex-wrap gap-32'>
        <div className='content flex gap-16'>
            <label>Movie</label>
            <input type='text' className='h-100' name='movie' placeholder='Search for a movie...' onChange={searchValueChange} />
        </div>
        <div>
            <div className='content flex gap-16'>
                <label>Genre</label>
                {
                    genersList.length > 0 &&
                    (
                        <select onChange={searchValueChange} name='genre' className='h-100' title='Genres'>
                            {
                                genersList.map((val, index) => (
                                    <option key={index} value={val.id} className='black-text'>{val.name}</option>
                                ))
                            }
                        </select>
                    )
                }
            </div>
            <div> 

            {
                searchValue.genre?.length > 0 && 
                    (<div className='flex gap-16'>
                        {
                            searchValue.genre.map((val, index) =>  (
                                    <div key={`genre_${val.name}_${index}`} className='align-items-center gap-12 grey-bg br-6 chip'>
                                        {val.name}
                                        <span onClick={(e) => clearGenre(val.id)} className='cp chip-close fs-20'>&times;</span>
                                    </div>
                                    
                                )
                            )
                        }
                    </div>)
            }
            </div>
            </div>
            <div className='content flex gap-16'>
                <label> Release Year From</label>
                <DatePicker
                selected={(searchValue.releaseYearFrom).toString()}
                onChange={(date) => dateChange(date,'releaseYearFrom')}
                showYearPicker
                dateFormat="yyyy"
                className='h-100'
                />
                {validationError.releaseYearFromError && <small> Release Year From should be less than Release Year To.</small>}
            </div>
            <div className='content flex gap-16'>
                <label> Release Year To</label>
                <DatePicker
                selected={(searchValue.releaseYearTo).toString()}
                onChange={(date) => dateChange(date,'releaseYearTo')}
                showYearPicker
                dateFormat="yyyy"
                className='h-100'
            />
            {validationError.releaseYearToError && <small> Release Year To should be greater than Release Year From.</small>}
            </div>
            <div>
                <div className='content flex gap-16'>
                    <label>Rating Value From</label>
                    <input type='number' min={1} max={10} defaultValue={1} className='h-100' name='ratingFrom' placeholder='Enter the rating value from...' onChange={searchValueChange} />
                    {validationError.rating1Error && <small> Rating 1 should be less than rating 2.</small>}
                </div>
                <div className='content flex gap-16'>
                    <label>Rating Value To</label>
                    <input type='number' min={1} max={10} defaultValue={1} className='h-100' name='ratingTo' placeholder='Enter the rating value to...' onChange={searchValueChange} />
                    {validationError.rating2Error && <small> Rating 2 should be greater than rating 1.</small>}
                </div>
            </div>


        </div>
    )
}
