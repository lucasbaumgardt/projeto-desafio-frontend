import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import searchIcon from '../../assets/search.svg';
import star from '../../assets/star.svg';
import addcicle from '../../assets/add_circle.svg';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import api from '../../services/api';

import { useCart } from '../../contexts/Cart/cartContext';

function PaginaInicial() {

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const pages = Math.ceil(products.length / productsPerPage)
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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


  useEffect(() => {
    if (search.trim() === "") {
      setIsListVisible(false);
      setFilteredProducts([]);
      return;
    }

    const searchLowerCase = search.toLowerCase();
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchLowerCase));
    setFilteredProducts(filtered);
    setIsListVisible(true);
  }, [search, products]);
  

  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setProductsPerPage(9);
      } else if (window.innerWidth >= 768) {
        setProductsPerPage(6);
      } else if (window.innerWidth >= 360) {
        setProductsPerPage(5);
      } else {
        setProductsPerPage(9);
      }
    };
  
    updateProductsPerPage();
  
    window.addEventListener("resize", updateProductsPerPage);
  
    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, [search, products]);  

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
    if (addToCart) {
      toast.success(`Produto adicionado ao carrinho!`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Erro ao adicionar produto ao carrinho!`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <div className="flex flex-col items-center">

      <div className="bg-grey2 md:bg-grey1 xl:bg-grey1 z-0 md:w-[80%] xl:w-[90%] md:h-[90vh] xl:h-[95vh] flex flex-col items-center p-4 md:mt-6 md:mb-6 md:mr-8 md:ml-32 xl:mt-6 xl:mb-6 xl:mr-8 xl:ml-32 md:border-2 xl:border-2 border-grey2 md:border-green1 xl:border-green1 md:rounded-[15px] xl:rounded-[15px] outline-none">
        <div className='relative md:w-[90%] w-[90%] mt-2'>
          <input type='search' onClick={() => setIsListVisible(true)} onChange={(e) => setSearch(e.target.value)} className='bg-black w-[100%] text-white font-primary border h-10 sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] outline-none'></input>
          
          {search.trim() ? (
            <ul className={`absolute top-full left-0 right-0 bg-grey1 z-50 mt-1 overflow-y-auto max-h-[200px] border border-green1`}>
              {filteredProducts.map((product) => (
                <li className="m-4" key={product.name}>
                  <p className='text-white'>{product.name}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <img
            src={searchIcon}
            alt="Ícone de pesquisa"
            className="absolute right-5 top-2"
          />
        </div>

        <div className="w-[95%] h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-grey2 w-[100%] h-[20vh] md:h-[25vh] xl:h-48 border-8 md:border-2 xl:border-2 border-grey1 md:border-green1 xl:border-green1 rounded-[15px] outline-none m-auto">
              <div className='m-2 md:m-5 xl:m-5 flex flex-col gap-1'>
                <div className='flex flex-row items-center'>
                  <h1 className='font-primary text-white text-[15px] md:text-[15px] xl:text-[25px]'>{product.name}</h1>
                  {product.favorite && (
                    <img
                      className="ml-auto w-6 md:w-9 xl:w-9 h-6 md:h-9 xl:h-9 cursor-pointer"
                      src={star}
                      alt="Star Icon"
                      style={{ filter: favoriteProducts.includes(product.id) ? "brightness(100%)" : "brightness(100%)" }}
                    />
                  )}
                </div>
                <hr className='bg-green1 w-68 border-none h-0.5 mt-1 mb-1'></hr>
                
                <div className='w-full h-[10vh]'>
                  <p className='text-white text-[10px] md:text-[15px] xl:text-[15px]'>{product.description}</p>
                </div>
                <div className='mt-[-10%] md:mt-10 xl:mt-4 flex flex-row items-center'>
                  <p className='font-primary text-white text-[10px] md:text-[15px] xl:text-[20px]'>{parseFloat(product.value).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}</p>
                  <img className="ml-auto w-6 md:w-9 xl:w-9 h-6 md:h-9 xl:h-9 cursor-pointer" src={addcicle} alt="Add Circle Icon" onClick={() => adicionarProdutoAoCarrinho(product)}></img>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-row gap-2 absolute h-20 md:h-10 bottom-[-45%] md:bottom-6 xl:bottom-12'>

          <BiChevronLeft className='w-10 h-10 text-white cursor-pointer' onClick={handlePrevPage}></BiChevronLeft>

          
          {Array.from(Array(pages), (product, index) => {
              return <button key={index} value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}
              className={`w-8 h-10 text-white text-[20px] font-primary rounded-[10px] cursor-pointer ${index === currentPage ? 'font-primary bg-green2 w-8 h-10' : ''}`}
              >{index + 1}</button>
          })}
        

          <BiChevronRight className='w-10 h-10 text-white cursor-pointer' onClick={handleNextPage}></BiChevronRight>
        </div>
      </div>
    </div>
  );
}

export default PaginaInicial;
