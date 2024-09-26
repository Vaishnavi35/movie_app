import React from 'react';
import Heart from "../assets/images/heart_icon.png";
import Home from "../assets/images/home.png";
import { useLocation, useNavigate } from 'react-router-dom';

const styles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: '5px'
};



export const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  console.log('location: ' , location);
  
  const redirectTo = (type) => {
    if(type === 'fav'){
        navigate('/favoriteMovies');
    }else {
        navigate('/');
    }
  }

  return (
    <div className='navbar h-100 p-16 jc-spc-btw' style={styles}>
    <div className='flex gap-20'>
      <img src={Heart} alt='Favorite Movies Cart' className='fav-icon cp' onClick={(e) => redirectTo('fav')} title='favorite cart'/>
      {
        location.pathname !== '/' && <img src={Home} alt='Home' className='fav-icon cp' onClick={(e) => {redirectTo('home')}} title='Home'/>
      }
      
    </div>
    </div>
  )
}
