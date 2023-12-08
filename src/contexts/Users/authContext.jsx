import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import api from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const storedData = localStorage.getItem("userData");
        return storedData ? JSON.parse(storedData) : null;
    });

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    const signIn = async ({ cpf }) => {
        try {
        const response = await api.get(`/pessoas?cpf=${cpf}`);

        console.log(response.data);
        console.log(response.data);

            if (response.data) {
                localStorage.setItem("userData", JSON.stringify(response.data));
                setUserData(response.data);
            
                toast.success(`Seja bem-vindo novamente ${response.data.person.name}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                return <Navigate to="/initial-page"/>

            } else {
                Swal.fire(
                "Erro ao fazer login",
                "Verifique suas credenciais e tente novamente",
                "error"
                );
            }
        } catch (error) {
        console.error("Erro ao executar a função handleLogin:", error);
        Swal.fire(
            "Erro ao fazer login",
            "Verifique suas credenciais e tente novamente",
            "error"
        );
        }
    };

    const signUp = async ({ name, cpf, admin }) => {
        try {
            const response = await api.post("/pessoas", {
                name,
                cpf,
                admin,
            });

            if (response.status === 201) {
                Swal.fire("Registro bem-sucedido", "Faça login para continuar", "success");
                return true;
            } else {
                console.log('erro')
                return false;
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Erro ao registrar", "Verifique se o cpf já está cadastrado", "error");
        }
    };

    const signOut = () => {
        localStorage.removeItem("userData");
        setUserData(null);
        return <Navigate to="/login"/>
    };

    return (
        <AuthContext.Provider
        value={{
            userData,
            signIn,
            signUp,
            signOut,
            // isCommonUser: userData && !userData.person.admin,
            // isAdmin: userData && userData.person.admin,
            signed: !!userData
        
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};
