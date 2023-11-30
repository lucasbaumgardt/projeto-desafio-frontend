import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import folhaverde from '../../assets/folinha-verde.svg';
import cart from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import logout from '../../assets/logout.svg';

function MenuBar () {
    return (
        <nav className="fixed top-0 left-0 bg-menubar z-10 w-24 h-screen p-4 border-r-2 border-borderRight outline-none">
            <div className='flex flex-col items-center'>
                <img className="w-12 h-20 mt-2" src={folhaverde}></img>
                <img className="w-12 mt-8" src={cart}></img>
                <img className="w-12 mt-8" src={clock}></img>
                <img className="w-12 absolute bottom-8" src={logout}></img>
            </div>
            {/* <ul>
            <li>
                <Link to="/dashboard" className="text-white hover:text-gray-400">
                Dashboard
                </Link>
            </li>
            <li>
                <Link to="/profile" className="text-white hover:text-gray-400">
                Perfil
                </Link>
            </li>
            </ul> */}
        </nav> 
    )
}

export default MenuBar;