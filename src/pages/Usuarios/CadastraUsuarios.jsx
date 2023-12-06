import React, { useState, useEffect } from "react";
import '../../App.css';
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import adminicon from '../../assets/admin.svg';
import searchIcon from '../../assets/search.svg';
import api from "../../services/api";

function CadastraUsuarios() {   
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [usersPerPage, setUsersPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(users.length / usersPerPage)
    const startIndex = currentPage * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

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

    return (
        <div className="flex flex-col justify-center">

            <div className="w-[90%] mx-[8%] my-auto mt-10">
                <div className="w-[100%] flex flex-row justify-between">
                    <button className="flex flex-row justify-center items-center gap-8 bg-green1 w-56 h-12 text-white text-[20px] font-primary rounded-[5px]">
                        <AiOutlinePlus className="text-[30px]"/> Cadastrar
                    </button>
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
                            <th className="w-4 border-green1 border-custom border-b-2 p-2 font-primary text-white text-center">Id</th>
                            <th className="w-40 border-green1 border-b-2 p-2 font-primary text-white text-center">Nome Completo</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-center">CPF</th>
                            <th className="w-32 border-green1 border-b-2 p-2 font-primary text-white text-center">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                    
                        {Array.isArray(currentUsers) && currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <tr key={index + 1}>
                            <td className="w-4 border-green1 border-2 p-2 font-primary text-white text-center">{index +1}</td>
                        
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

                        
                        </tbody>
                    </table>

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
