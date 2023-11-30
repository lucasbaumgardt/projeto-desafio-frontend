import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar/MenuBar';
import search from '../assets/search.svg';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../services/api';

function PaginaInicial() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/produtos/lista');

        if (response.status !== 200) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }

        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div className="flex">
      <MenuBar/>

      <div className="bg-container-color z-0 w-container-width h-auto flex flex-col items-center p-4 m-8
      border-2 border-greenBorder2 rounded-borderCustom outline-none">
        
        <div className='relative w-search-div'>
          <input type='search' className='bg-black w-search-width text-white font-primary border h-12 mt-6 p-4 border-greenBorder2 rounded-borderCustom outline-none'>
          
          </input>

          <img
            src={search}
            alt="Ícone de pesquisa"
            className="absolute right-5 top-9 bottom-auto"
          />
        </div>

        <div className="w-container-grid h-auto grid grid-cols-3 gap-10 mt-10">
          {products.map((product) => (
            <div key={product.id} className="bg-card-color w-card-grid border-2 h-52 border-greenBorder2 rounded-borderCustom outline-none m-auto">
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PaginaInicial;
