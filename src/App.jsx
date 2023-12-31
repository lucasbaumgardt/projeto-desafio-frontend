import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import folha1 from './assets/folhapormade-fundo.svg';
import folha2 from './assets/folhapormade-fundo2.svg';
import { CartProvider } from "./contexts/Cart/cartContext";
import { AuthProvider } from "./contexts/Users/authContext";
import AppRoutes from "./AppRoutes";

function App() {

  return (
    <AuthProvider>
        <CartProvider>
        <ToastContainer />
        <img src={folha1} alt="Folha 1" className="absolute top-0 right-0 w-96 h-96" />
        <img src={folha2} alt="Folha 2" className="absolute bottom-0 left-0 w-96 h-96" />
        <AppRoutes />
        </CartProvider>
    </AuthProvider>
  );
}

export default App;
