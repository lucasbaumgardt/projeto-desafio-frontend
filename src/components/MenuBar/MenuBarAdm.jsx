import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import folhaverde from '../../assets/folinha-verde.svg';
import cart from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import logout from '../../assets/logout.svg';
import adm from '../../assets/admin.svg'

function MenuBarAdm () {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login")
    }
    return (
        <nav className="fixed top-0 bg-menubar z-10 w-28 h-screen p-4 border-r-2 border-borderRight outline-none">
            <div className='flex flex-col items-center'>
                <img className="w-12 h-20 mt-2" src={folhaverde}></img>
                <img className="w-12 mt-8" src={cart}></img>
                <img className="w-12 mt-8" src={clock}></img>
                <img className="w-12 absolute bottom-8 cursor-pointer" src={logout} onClick={handleLogout}></img>
                <img className="w-12 mt-8" src={adm}></img>
                
            </div>
            </nav> 
    )
}

export default MenuBarAdm;