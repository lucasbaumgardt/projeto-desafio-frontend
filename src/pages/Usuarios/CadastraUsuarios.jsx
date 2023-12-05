import React, { useState, useEffect } from "react";
import '../../App.css';
import adminicon from '../../assets/admin.svg';
import api from "../../services/api";

function CadastraUsuarios() {   
    const [users, setUsers] = useState([]);
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
    }, [cpfFromStorage]);

    return (
        <div className="flex flex-col justify-center">

        <div className="w-[90%] mx-[8%] my-auto mt-10">
        <button className="bg-green1 w-56 h-12 text-white text-[25px] font-primary rounded-[5px]">Cadastrar</button>
        <div className="w-[100%] bg-grey1 h-[80vh]">
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
          
            {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
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
        </div>
        </div>
        </div>
    );
}

export default CadastraUsuarios;
