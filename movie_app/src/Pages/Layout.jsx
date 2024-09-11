import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import "./../Styles/Layout.scss";

export default function Layout() {
    return (
        <div className='layout w-100 h-100 flex'>
            <div className='navbar-container'>
                <Navbar />
            </div>
            <div className='page-layout fixed' style={{ alignSelf: 'end' }}>
                <Outlet />
            </div>
        </div>
    )
}
