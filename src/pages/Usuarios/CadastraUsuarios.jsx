import React, { useState, useEffect, useContext } from "react";
import Modal from 'react-modal';
import '../../App.css';
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import adminicon from '../../assets/admin.svg';
import searchIcon from '../../assets/search.svg';
import attention from '../../assets/attention.svg';
import admintrue from '../../assets/admintrue.svg';
import adminfalse from '../../assets/adminfalse.svg';
import api from "../../services/api";
import { AuthContext } from "../../contexts/Users/authContext";

function CadastraUsuarios() {
    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [admin, setAdmin] = useState(false);
    const [adminIcon, setAdminIcon] = useState(adminfalse);   
    const [users, setUsers] = useState([]);

    const toggleAdmin = () => {
        setAdmin(!admin); 
        setAdminIcon(admin ? adminfalse : admintrue);
    };    

    const handleRegister = async () => {
        try {
            const data = {
                name,
                cpf,
                admin
            };
            const registerSuccessFul = await signUp(data);

            if (registerSuccessFul) {
                setModalIsOpen(false);
                setName("");
                setCpf("");
            } else {
                console.log('erro');
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [usersPerPage, setUsersPerPage] = useState(13);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(users.length / usersPerPage)
    const startIndex = currentPage * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = [...users.slice(startIndex, endIndex)];

    const currentIdStart = currentPage * usersPerPage + 1;

    const emptyRowsIdStart = currentIdStart + currentUsers.length;

    const userData = localStorage.getItem("userData");
    console.log(userData);

    const cpfFromStorage = userData ? JSON.parse(userData).person.cpf : null;

    useEffect(() => {
        if (cpfFromStorage) {
        console.log("CPF extraído do localStorage:", cpfFromStorage);
 
        api.post("/pessoas/lista", { cpf: cpfFromStorage })
            .then(response => {
            console.log("resposta: ", response.data)
            setUsers(response.data.persons);
            })
            .catch(error => {
            console.error("Erro ao fazer a requisição:", error);
            });
        }
    }, [cpfFromStorage, currentPage]);

    useEffect(() => {
        if (search.trim() === "") {
          setIsListVisible(false);
          setFilteredUsers([]);
          return;
        }
    
        const searchLowerCase = search.toLowerCase();
        const filtered = users.filter((user) => user.name.toLowerCase().includes(searchLowerCase));
        setFilteredUsers(filtered);
        setIsListVisible(true);
      }, [search, users]);


    const emptyRowsCount = usersPerPage - currentUsers.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => ({ id: index + currentUsers.length + 1 }));
    
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

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleShowModal = (userId) => {
        setUserToDelete(userId);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setUserToDelete(null);
        setModalIsOpen(false);
    };

    const handleShowModal2 = (userId) => {
        setUserToDelete(userId);
        setModalIsOpen2(true);
    };

    const handleCloseModal2 = () => {
        setUserToDelete(null);
        setModalIsOpen2(false);
    };

    const handleDeleteUser = () => {
        if (userToDelete) {
            removeFromCart(userToDelete);
            handleCloseModal();
        }
    };

    const customStyles = {
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '40%',
          height: '40vh',
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
                    onClick={() => setModalIsOpen(true)}>
                        <AiOutlinePlus className="text-[30px]"/> Cadastrar
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="Carrinho de Compras"
                        style={customStyles}
                        >
                        <div className="w-full h-full flex flex-col justify-between items-center gap-2">
                            <h1 className="text-white text-[25px] font-primary">Novo Usuário</h1>

                            <div className="w-[90%] flex flex-col justify-between gap-2">
                                <p className="text-white text-[20px] font-primary">Nome Completo</p>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='bg-black w-[100%] 
                                text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                outline-none'></input>
                            </div>

                            <div className="w-[90%] flex flex-row justify-center items-center gap-12">
                                    <div className="w-[100%] flex flex-row justify-between items-center">
                                        <div className="w-[100%] flex flex-col gap-2">
                                            <p className="text-white text-[20px] font-primary">CPF</p>
                                            <input type='text' value={cpf} onChange={(e) => setCpf(e.target.value)} className='bg-black w-[80%] 
                                            text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] 
                                            outline-none'></input>
                                        </div>

                                        <div className="w-[50%] flex flex-col">
                                            <p className="text-white text-[20px] font-primary">Administrador</p>
                                            <button
                                                className="w-16 h-12"
                                                onClick={toggleAdmin}
                                            >
                                                {adminIcon && <img className="w-16 h-12" src={adminIcon} alt="Admin Icon" />}
                                                {admin ? true : false}
                                            </button>
                                        </div>
                                    </div>
                            </div>

                            <div className="flex flex-row justify-between gap-20">
                                <button className="w-60 h-14 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="w-60 h-14 bg-green1 rounded-[5px] text-white text-[20px] font-primary" onClick={() => handleRegister()}>Salvar</button>
                            </div>
                        </div>
                    </Modal>
                    <div className='relative w-[40%] mt-2'>
                        <input type='search' onClick={() => setIsListVisible(true)} onChange={(e) => setSearch(e.target.value)} className='bg-black w-[100%] text-white font-primary border sm:h-8 md:h-8 lg:h-10 xl:h-10 p-4 border-green1 rounded-[15px] outline-none'></input>
                        
                        {search.trim() ? (
                            <ul className={`absolute top-full left-0 right-0 bg-grey1 z-50 mt-1 overflow-y-auto max-h-[200px] border border-green1`}>
                            {filteredUsers.map((user) => (
                                <li className="m-4" key={user.cpf}>
                                <p className='text-white'>{user.name}</p>
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
                            <th className="w-40 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">Nome Completo</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">CPF</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-[20px] text-center">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                    
                        {Array.isArray(currentUsers) && currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <tr key={index + 1}>
                                <td className="w-4 border-green1 border-2 p-2 font-primary text-white text-center">{currentIdStart + index}</td>
                            
                                <td className="w-40 border-green1 border-2 p-2 font-primary text-white text-center">
                                <div className="flex flex-row justify-center items-center">
                                    {user.name} 
                                    {user.admin && <img className="w-4 ml-2 absolute right-[30%] -m-4" src={adminicon} alt="Admin Icon" />}
                                </div>
                                </td>


                                <td className="w-32 border-green1 border-2 p-2 font-primary text-white text-center">{user.cpf.replace(/\D/g, '')
                                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                                </td>
                                <td className="w-32 border-green1 border-2 p-2 text-center"></td>
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
                        isOpen={modalIsOpen2}
                        onRequestClose={() => setModalIsOpen2(false)}
                        contentLabel="Carrinho de Compras"
                        style={customStyles2}
                        >
                        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                            <img src={attention} alt="atenção" className="w-20 h-20"></img>
                            <h1 className="text-white text-[25px] font-primary">Tem certeza que deseja deletar este usuário?</h1>

                            <div className="flex flex-row justify-between gap-20">
                                <button className="w-60 h-14 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={handleCloseModal2}>Não</button>
                                <button className="w-60 h-14 bg-green1 rounded-[5px] text-white text-[20px] font-primary" onClick={handleDeleteUser}>Sim</button>
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

export default CadastraUsuarios;
