import React from 'react';
import left_menus from '../constants/LeftMenuList';
import { Link } from 'react-router-dom';

const hideDotStyle = {listStyleType: 'none'};

export default function LeftMenu() {
    return (
        <>
            <div className='left-menu w-100 h-100 p-16'>
                <ul style={hideDotStyle}>
                    {
                        left_menus.map((menu) => {
                            return <li key={`left_menu_${menu.name}`} className='my-16'>
                                <Link to={menu.url} className='white-text'>{menu.name} </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>

    )
}
