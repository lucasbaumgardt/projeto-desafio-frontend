import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

import logo from '../assets/logopormade.svg';
import folha1 from '../assets/folhapormade-fundo.svg';
import folha2 from '../assets/folhapormade-fundo2.svg';

function Login () {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [admin, setAdmin] = useState(false);

    const [nameRegister, setNameRegister] = useState("");
    const [cpfRegister, setCpfRegister] = useState("");

    const navigate = useNavigate();

    const centerButtonClass = "mx-auto my-auto";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const response = await api.get(`/pessoas?cpf=${cpf}`);

        console.log(response.data)

          if (response.data) {
            Swal.fire({
              title: `Seja bem vindo novamente ${response.data.person.name}`,
              text: '',
              showConfirmButton: false,
              position: 'bottom-end',
              customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
              } 
            });
            
            navigate('/initial-page');
          }
        } catch (error) {
            console.log(error);
            Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        const response = await api.post("/pessoas", {
            name: nameRegister,
            cpf: cpfRegister,
            admin: admin,
        });

        if (response.status === 200) {
            Swal.fire("Registro bem-sucedido", "Faça login para continuar", "success");
            setNameRegister("");
            setCpfRegister("");
        }
        } catch (error) {
            console.log(error);
            Swal.fire("Erro ao registrar", "Verifique se o email já está cadastrado", "error");
        }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">

        <img src={logo} alt="Logo Pormade" className="absolute top-4"></img>

        {/*<img src={folha1} alt="Folha 1" className="absolute top-0 right-0 w-96 h-96" />

        <img src={folha2} alt="Folha 2" className="absolute bottom-0 left-0 w-96 h-96" /> */}

        <form className="relative z-10 flex flex-col items-start sm:w-form-sm md:w-form-md lg:w-form-lg xl:w-form-xl">
            <div className="flex items-center justify-center mx-auto my-auto">
              <h1 className="font-primary text-white text-[48px] p-4 mb-0 -ml-4">Entrar</h1>
            </div>
            <h2 className="font-primary text-white text-[24px] p-4 mb-0 -ml-4">Digite seu CPF</h2>
            <input
            type="text"
            className="w-full md:w-width-md h-12 bg-opacity-100 -mb-2 bg-input border-2 border-greenBorder p-4 rounded-borderCustom outline-none font-primary text-sm text-white text-[18px]"
            placeholder="Digite aqui"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            />
            <div className="flex items-center mt-5">
                <input
                type="checkbox"
                id="keepLoggedIn"
                className="mr-2"
                />
                <label htmlFor="keepLoggedIn" className="text-white text-[14px]">
                Manter-me conectado
                </label>
            </div>

            <div className="w-buttonWidth flex flex-col items-center justify-center mx-auto my-auto">
              <button type="submit" onClick={handleLogin} className={`${centerButtonClass} h-12 bg-greenBg w-full mt-5 border-greenBorder p-2 rounded-borderCustom outline-none font-primary text-sm text-white text-[26px]`}>Acessar</button>
              <Link className="mt-2 font-primary text-white text-[14px] hover:text-gray-400" to="/suporte">Suporte</Link>
            </div>
        </form>
      </div>
    )

}

export default Login;