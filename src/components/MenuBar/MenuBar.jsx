import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import folhaverde from '../../assets/folinha-verde.svg';
import cart from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';

function MenuBar () {
    return (
        <nav className="bg-menubar z-0 w-28 h-screen p-4">
            <div className='flex flex-col items-center'>
                <img className="w-20 h-16  mt-2" src={folhaverde}></img>
                <img className="w-16 h-16 mt-8" src={clock}></img>
                <img className="w-16 h-16 mt-8" src={cart}></img>
                <img className="w-16 h-16 mb-2 absolute bottom-0" src={cart}></img>
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