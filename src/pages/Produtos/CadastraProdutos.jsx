import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import '../../App.css';
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import favoriteicon from '../../assets/star.svg';
import favoriteicon2 from '../../assets/staroff.svg';
import searchIcon from '../../assets/search.svg';
import attention from '../../assets/attention.svg';
import favoritetrue from '../../assets/admintrue.svg';
import favoritefalse from '../../assets/adminfalse.svg';
import editinfo from '../../assets/edit.svg';
import deleteproduct from '../../assets/delete.svg';
import api from "../../services/api";

function CadastraProdutos() {   
    const [products, setProducts] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [favorite, setFavorite] = useState(false);
    const getFavoriteIcons = () => {
        return favorite ? [favoritetrue, favoriteicon] : [favoritefalse, favoriteicon2];
    }; 
    const [icon1, icon2] = getFavoriteIcons();
       
    const [description, setDescription] = useState("");
    
    const userData = localStorage.getItem("userData");
    console.log(userData);
    const creatorCpf = userData ? JSON.parse(userData).person.cpf : null;
    console.log(creatorCpf);
    const setCreatorCpf = useState("");

    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(13);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(products.length / productsPerPage)
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = [...products.slice(startIndex, endIndex)];

    const currentIdStart = currentPage * productsPerPage + 1;
    const emptyRowsIdStart = currentIdStart + currentProducts.length;

    const [modalCadIsOpen, setModalCadIsOpen] = useState(false);
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

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

    const toggleFavorite = () => {
        setFavorite(!favorite); 
    };
    

    const handleCadProduct = async () => {
        try {
            const response = await api.post("/produtos", {
                name: name,
                value: parseFloat(value),
                favorite: favorite,
                description: description,
                creatorCpf: creatorCpf,
            });

            if (response.status === 201) {
                Swal.fire("Produto cadastrado com sucesso!", "", "success");
                setModalCadIsOpen(false);
                setName("");
                setValue("");
                setFavorite(false);
                setDescription("");
            } else {
                console.log('erro')
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Erro ao registrar", "Verifique se o produto já está cadastrado", "error");
        }
    };

    const handleEditProduct = async () => {
        try {
            console.log("ID do produto:", id);
            const response = await api.put("/produtos", {
                id: parseInt(id),
                updatorCpf: creatorCpf,
                update: {
                    name: name,
                    value: parseFloat(value),
                    favorite: favorite,
                    description: description
                }
            });
            setModalEditIsOpen(false);
            setName("");
            setValue("");
            setFavorite(false);
            setDescription("");

            if (response.status === 200) {
                Swal.fire("Edição bem-sucedida", "", "success");
                return true;
            } else {
                console.log('erro', id)
                return false;
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Erro ao editar", "Por favor, tente novamente.", "error");
        }
    };

    const emptyRowsCount = productsPerPage - currentProducts.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => ({ id: index + currentProducts.length + 1 }));
    
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

    const closeModalCad = () => {
        setProductToDelete(null);
        setModalCadIsOpen(false);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setModalDeleteIsOpen(false);
    };

    const openEditModal = (product) => {
        setProductToEdit(product);
        setId(product.id);
        setName(product.name);
        setDescription(product.description);
        setFavorite(product.favorite);
        setValue(product.value);
        setModalEditIsOpen(true);
      };

    const closeModalEdit = () => {
        setProductToEdit(null);
        setModalEditIsOpen(false);
    };

    const customStyles = {
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '55%',
          height: '50vh',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#0A0A0A',
          border: '2px solid #509D46',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          overflowY: 'hidden'
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          zIndex: 999,
        },
    };

    const customStyles2 = {
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '40%',
          height: '30vh',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#0A0A0A',
          border: '2px solid #509D46',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          overflowY: 'hidden'
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          zIndex: 999,
        },
    };

    return (
        <div className="flex flex-col justify-center">

            <div className="w-[90%] mx-[8%] my-auto mt-10">
                <div className="w-[100%] flex flex-row justify-between">
                    <button className="flex flex-row justify-center items-center gap-8 bg-green1 w-56 h-12 text-white text-[20px] font-primary rounded-[5px]" 
                    onClick={() => setModalCadIsOpen(true)}>
                        <AiOutlinePlus className="text-[30px]"/> Cadastrar
                    </button>
                    <Modal
                        isOpen={modalCadIsOpen}
                        onRequestClose={() => setModalCadIsOpen(false)}
                        contentLabel="Cadastrar Novo Usuário"
                        style={customStyles}
                        >
                        <div className="w-[90%] h-full flex flex-col justify-between items-center gap-2 mx-auto my-auto">
                            <h1 className="text-white text-[25px] font-primary">Novo Produto</h1>
 
                            <div className="w-[100%] flex flex-row justify-between items-center">
                                <div className="w-[100%] flex flex-col gap-2">
                                    <p className="text-white text-[20px] font-primary">Nome do Produto</p>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='bg-black w-[100%] 
                                    text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                    outline-none' placeholder="Digite o Nome"></input>
                                </div>

                                <div className="w-[60%] flex flex-col justify-center items-center">
                                    <p className="text-white text-[20px] font-primary">Favorito</p>
                                    <div className="w-full h-full flex flex-row justify-center items-center gap-4" onClick={toggleFavorite}>
                                        
                                        {icon1 && <img className="w-16 h-12" src={icon1} alt="Favorite Icon" />}
                                        {icon2 && <img className="w-10 h-10" src={icon2} alt="Favorite Icon" />}
                                        {favorite ? true : false}
                                        
                                    </div>
                                </div>

                                <div className="w-[40%] flex flex-col gap-2">
                                    <p className="text-white text-[20px] font-primary">Preço</p>
                                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='bg-black w-[100%] 
                                    text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                    outline-none' placeholder="Digite o Preço"></input>
                                </div>
                            </div>  

                            <div className="w-[100%] flex flex-col justify-between gap-2">
                                <p className="text-white text-[20px] font-primary">Descrição</p>
                                <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='bg-black w-[100%] 
                                text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-24 p-4 border-green1 rounded-[15px] 
                                outline-none whitespace-normal scroll-cart' placeholder="Adicione uma descrição"></textarea>
                            </div>

                            <div className="flex flex-row justify-between gap-64">
                                <button className="w-80 h-16 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={closeModalCad}>Cancelar</button>
                                <button type="submit" className="w-80 h-16 bg-green1 rounded-[5px] text-white text-[20px] font-primary" onClick={() => handleCadProduct()}>Salvar</button>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={modalEditIsOpen}
                        onRequestClose={() => {
                            setModalEditIsOpen(false);
                            setProductToEdit(null); 
                        }}
                        contentLabel="Editar Usuário"
                        style={customStyles}
                        >
                        <div className="w-[90%] h-full flex flex-col justify-between items-center gap-2 mx-auto my-auto">
                            <h1 className="text-white text-[25px] font-primary">Editar Produto</h1>

                            <div className="w-[100%] flex flex-row justify-between items-center">
                                <div className="w-[100%] flex flex-col gap-2">
                                    <p className="text-white text-[20px] font-primary">Nome do Produto</p>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='bg-black w-[100%] 
                                    text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                    outline-none' placeholder="Digite o Nome"></input>
                                </div>

                                <div className="w-[60%] flex flex-col justify-center items-center">
                                    <p className="text-white text-[20px] font-primary">Favorito</p>
                                    <div className="w-full h-full flex flex-row justify-center items-center gap-4" onClick={toggleFavorite}>
                                        
                                        {icon1 && <img className="w-16 h-12" src={icon1} alt="Favorite Icon" />}
                                        {icon2 && <img className="w-10 h-10" src={icon2} alt="Favorite Icon" />}
                                        {favorite ? true : false}
                                        
                                    </div>
                                </div>

                                <div className="w-[40%] flex flex-col gap-2">
                                    <p className="text-white text-[20px] font-primary">Preço</p>
                                    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='bg-black w-[100%] 
                                    text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                    outline-none' placeholder="Digite o Preço"></input>
                                </div>
                            </div>  

                            <div className="w-[100%] flex flex-col justify-between gap-2">
                                <p className="text-white text-[20px] font-primary">Descrição</p>
                                <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='bg-black w-[100%] 
                                text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-24 p-4 border-green1 rounded-[15px] 
                                outline-none whitespace-normal scroll-cart' placeholder="Adicione uma descrição"></textarea>
                            </div>

                            <div className="flex flex-row justify-between gap-64">
                                <button className="w-80 h-16 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={closeModalEdit}>Cancelar</button>
                                <button type="submit" className="w-80 h-16 bg-green1 rounded-[5px] text-white text-[20px] font-primary" onClick={() => handleEditProduct()}>Salvar</button>
                            </div>
                        </div>
                    </Modal>
                    <div className='relative w-[40%] mt-2'>
                        <input type='search' onClick={() => setIsListVisible(true)} onChange={(e) => setSearch(e.target.value)} className='bg-black w-[100%] text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] outline-none'></input>
                        
                        {search.trim() ? (
                            <ul className={`absolute top-full left-0 right-0 bg-grey1 z-50 mt-1 overflow-y-auto max-h-[200px] border border-green1`}>
                            {filteredProducts.map((product) => (
                                <li className="m-4" key={product.cpf}>
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
                </div>  
                <div className="w-[100%] bg-grey1 relative h-[80vh]">
                    <table className="w-[100%] bg-grey1 border-green1 border-2 mt-4">
                        <thead className="bg-green1 text-white">
                        <tr>
                            <th className="w-4 border-green1 border-custom border-b-2 p-2 font-primary text-white text-[20px] text-center">Id</th>
                            <th className="w-40 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">Produto</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">Preço</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                    
                        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                            <tr key={index + 1}>
                                <td className="w-4 border-green1 border-2 p-2 font-primary text-white text-center">{currentIdStart + index}</td>
                            
                                <td className="w-40 border-green1 border-2 p-2 font-primary text-white text-center">
                                <div className="flex flex-row justify-center items-center">
                                    {product.name} 
                                    {product.favorite && <img className="w-4 ml-2 absolute right-[60%] -m-8" src={favoriteicon} alt="Admin Icon" />}
                                </div>
                                </td>

                                <td className="w-32 border-green1 border-2 p-2 font-primary text-white text-center">
                                {parseFloat(product.value).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                                </td>
                                <td className="w-32 border-green1 border-2 p-2 text-center">
                                    <div className="w-[100%] h-full flex flex-row gap-4">
                                        <div className="">
                                            <img className="w-6 cursor-pointer" src={editinfo} onClick={() => openEditModal(product)}></img>
                                        </div>
                                        <img className="w-6 absolute right-4 cursor-pointer" src={deleteproduct} onClick={() => setModalDeleteIsOpen(true)}></img>
                                    </div>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="3" className="text-center">Nenhum usuário encontrado</td>
                        </tr>
                        )}

                        <>
                        {emptyRows.map((emptyRow, index) => (
                            <tr key={`empty-${emptyRow.id}`}>
                            <td className="w-4 border-green1 border-2 p-2 font-primary text-white text-center">{emptyRowsIdStart + index}</td>
                            <td className="w-40 border-green1 border-2 p-2 font-primary text-white text-center"></td>
                            <td className="w-32 border-green1 border-2 p-2 font-primary text-white text-center"></td>
                            <td className="w-32 border-green1 border-2 p-2 font-primary text-white text-center"></td>
                            </tr>
                        ))}
                        </>
                        
                        </tbody>
                    </table>

                    <Modal
                        isOpen={modalDeleteIsOpen}
                        onRequestClose={() => setModalDeleteIsOpen(false)}
                        contentLabel="Carrinho de Compras"
                        style={customStyles2}
                        >
                        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                            <img src={attention} alt="atenção" className="w-20 h-20"></img>
                            <h1 className="text-white text-[25px] font-primary">Tem certeza que deseja deletar este produto?</h1>

                            <div className="flex flex-row justify-between gap-20">
                                <button className="w-60 h-14 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={closeDeleteModal}>Não</button>
                                <button className="w-60 h-14 bg-green1 rounded-[5px] text-white text-[20px] font-primary">Sim</button>
                            </div>
                        </div>
                    </Modal>

                    <div className='w-[100%] h-10 flex flex-row justify-center items-center gap-2 absolute bottom-4'>

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
        </div>
    );
}

export default CadastraProdutos;
