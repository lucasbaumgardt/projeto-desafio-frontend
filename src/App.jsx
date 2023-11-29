import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Suporte from './pages/Suporte';
import PaginaInicial from "./pages/PaginaInicial";
import logo from './assets/logopormade.svg';
import folha1 from './assets/folhapormade-fundo.svg';
import folha2 from './assets/folhapormade-fundo2.svg';

function App() {

  return (
    <Router>

      <img src={folha1} alt="Folha 1" className="absolute top-0 right-0 w-96 h-96" />
      <img src={folha2} alt="Folha 2" className="absolute bottom-0 left-0 w-96 h-96" />
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>}></Route>

        <Route path="/initial-page" element={<PaginaInicial/>}></Route>
        <Route path="/suporte" element={<Suporte/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
