import React from 'react';
import MenuBar from '../components/MenuBar/MenuBar';
import { Link } from 'react-router-dom';

function PaginaInicial() {
  return (
    <div className="flex">
      {/* <nav className="bg-black w-64 h-screen p-4">
        <ul>
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
        </ul>
      </nav> */}

      <MenuBar/>

      <div className="flex-1 p-4">
        <h1>Bem-vindo à Página Inicial</h1>
      </div>
    </div>
  );
}

export default PaginaInicial;
