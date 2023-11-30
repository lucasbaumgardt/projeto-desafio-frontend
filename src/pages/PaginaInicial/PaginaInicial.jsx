import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import search from '../../assets/search.svg';
import star from '../../assets/star.svg';
import addcicle from '../../assets/add_circle.svg';
import api from '../../services/api';

function PaginaInicial() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/produtos/lista?pagina=${currentPage}&itens=9`);

        if (response.status !== 200) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }

        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <MenuBar />

      <div className="bg-container-color z-0 w-container-width h-container-height flex flex-col items-center p-4 mt-6 mb-6 mr-8 ml-36 border-2 border-greenBorder2 rounded-borderCustom outline-none">
        <div className='relative w-search-div mt-2'>
          <input type='search' className='bg-black w-search-width text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-greenBorder2 rounded-borderCustom outline-none'></input>
          <img
            src={search}
            alt="Ícone de pesquisa"
            className="absolute right-5 top-2"
          />
        </div>

        <div className="w-container-grid h-auto grid grid-cols-3 gap-8 mt-6">
          {products.map((product) => (
            <div key={product.id} className="bg-card-color sm:w-card-grid border-1 h-40 border-greenBorder2 rounded-borderCustom outline-none m-auto">
              <div className='m-2 flex flex-col gap-1'>
                <div className='flex flex-row items-center'>
                  <h1 className='font-primary text-white'>Product Name</h1>
                  <img className="ml-auto w-9 h-9" src={star} alt="Star Icon"></img>
                </div>
                <hr className='bg-greenBg w-68 border-none h-0.5'></hr>
                <p className='font-primary text-white'>{product.name}</p>
                <p className='text-white'>{product.description}</p>
                <div className='mt-1 flex flex-row items-center'>
                  <p className='font-primary text-white'>{product.value}</p>
                  <img className="ml-auto w-9 h-9" src={addcicle} alt="Add Circle Icon"></img>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handlePrevPage} className="bg-blue-500 text-white p-2 rounded">Página Anterior</button>
          <button onClick={handleNextPage} className="bg-blue-500 text-white p-2 rounded">Próxima Página</button>
        </div>

      </div>
    </div>
  );
}

export default PaginaInicial;
