import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import search from '../../assets/search.svg';
import star from '../../assets/star.svg';
import addcicle from '../../assets/add_circle.svg';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import api from '../../services/api';

import { useCart } from '../../contexts/cartContext';

function PaginaInicial() {

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(products.length / productsPerPage)
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/produtos/lista`);

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
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const adicionarProdutoAoCarrinho = (product) => {
    addToCart({ id: product.id, 
      name: product.name, 
      description: product.description, 
      value: product.value
    });
  };


  return (
    <div className="flex flex-col items-center">
      <MenuBar />

      <div className="bg-container-color z-0 w-container-width h-container-height flex flex-col items-center p-4 mt-6 mb-6 mr-8 ml-32 border-2 border-greenBorder2 rounded-borderCustom outline-none">
        <div className='relative w-search-div mt-2'>
          <input type='search' className='bg-black w-search-width text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-greenBorder2 rounded-borderCustom outline-none'></input>
          <img
            src={search}
            alt="Ícone de pesquisa"
            className="absolute right-5 top-2"
          />
        </div>

        <div className="w-container-grid h-auto grid grid-cols-3 gap-8 mt-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-card-color xl:w-xl-card-grid border-1 h-48 border-greenBorder2 rounded-borderCustom outline-none m-auto">
              <div className='m-5 flex flex-col gap-1'>
                <div className='flex flex-row items-center'>
                  <h1 className='font-primary text-white'>{product.name}</h1>
                  <img className="ml-auto w-9 h-9" src={star} alt="Star Icon"></img>
                </div>
                <hr className='bg-greenBg w-68 border-none h-0.5 mt-1 mb-1'></hr>
                {/* <p className='font-primary text-white'>{product.name}</p> */}
                <p className='text-white'>{product.description}</p>
                <div className='mt-4 flex flex-row items-center'>
                  <p className='font-primary text-white'>{parseFloat(product.value).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}</p>
                  <img className="ml-auto w-9 h-9" src={addcicle} alt="Add Circle Icon" onClick={() => adicionarProdutoAoCarrinho(product)}></img>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-row gap-2 absolute bottom-12'>

          <BiChevronLeft className='w-10 h-10 text-white cursor-pointer' onClick={handlePrevPage}></BiChevronLeft>

          
          {Array.from(Array(pages), (product, index) => {
              return <button key={index} value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}
              className={`w-8 h-10 text-white text-[20px] font-primary rounded-borderCustom2 cursor-pointer ${index === currentPage ? 'font-primary bg-page-color w-8 h-10' : ''}`}
              >{index + 1}</button>
          })}
        

          <BiChevronRight className='w-10 h-10 text-white cursor-pointer' onClick={handleNextPage}></BiChevronRight>
        </div>
      </div>
    </div>
  );
}

export default PaginaInicial;
