import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";
import logo from '../../assets/logopormade.svg';
import { AuthContext } from "../../contexts/Users/authContext";

function Login () {
    const { signIn, signed } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [admin, setAdmin] = useState(false);

    const [nameRegister, setNameRegister] = useState("");
    const [cpfRegister, setCpfRegister] = useState("");

    const centerButtonClass = "mx-auto my-auto";

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //     const response = await api.get(`/pessoas?cpf=${cpf}`);

    //     console.log(response.data)

    //       if (response.data && response.data.person.admin === true) {
    //         toast.success(`Seja bem-vindo novamente ${response.data.person.name}`, {
    //           position: 'bottom-right',
    //           autoClose: 2000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //         });
            
    //         navigate('/initial-page');
    //       }
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
    //     }
    // };

    const handleLogin = async (e) => {
      e.preventDefault();
      const data = {
        cpf
      };
      await signIn(data);
    };
    console.log(signed); 

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

    if (!signed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">

        <img src={logo} alt="Logo Pormade" className="absolute top-4"></img>

        <form className="relative z-10 flex flex-col items-start sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[40%]">
            <div className="flex items-center justify-center mx-auto my-auto">
              <h1 className="font-primary text-white text-[48px] p-4 mb-0 -ml-4">Entrar</h1>
            </div>
            <h2 className="font-primary text-white sm:text-[25px] md:text-[25px] lg:text-[25px] xl:text-[25px] p-4 mb-0 -ml-4">Digite seu CPF</h2>
            <input
            type="text"
            className="w-full h-12 bg-opacity-100 -mb-2 bg-input border-2 border-green2 p-4 rounded-[15px] outline-none font-primary text-sm text-white text-[18px]"
            placeholder="Digite seu CPF"
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

            <div className="w-[55%] flex flex-col items-center justify-center mx-auto my-auto">
              <button type="submit" onClick={handleLogin} className={`${centerButtonClass} h-12 bg-green1 w-full mt-5 border-green2 p-2 rounded-[15px] outline-none font-primary text-sm text-white sm:text-[25px] md:text-[25px] lg:text-[25px] xl:text-[25px]`}>Acessar</button>
              <Link className="mt-2 font-primary text-white text-[14px] hover:text-gray-400" to="/suporte">Suporte</Link>
            </div>
        </form>
      </div>
    )
  } else {
    return <Navigate to="/initial-page" />
  }
}

export default Login;