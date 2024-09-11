import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [searchValue, setSearchValue] = useState({
    movie: '',
    genre: [],
    releaseYearFrom: '',
    releaseYearTo: '',
    ratingFrom: '',
    ratingTo: ''
  });

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      {children}
    </SearchContext.Provider>
  )
}
