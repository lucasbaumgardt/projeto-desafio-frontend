import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Login from './pages/Login/Login';
import Suporte from "./pages/Suporte/Suporte";
import PaginaInicial from "./pages/PaginaInicial/PaginaInicial";
import CadastraUsuarios from "./pages/Usuarios/CadastraUsuarios";
import CadastraProdutos from "./pages/Produtos/CadastraProdutos";
import { PrivateRoutes } from "./PrivateRoutes";

function AppRoutes() {

    const Layout = ({ children }) => (
        <>
          <MenuBar />
          {children}
        </>
    );

    return (
 
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/suporte/*" element={<Layout><Suporte /></Layout>} />
                <Route element={<PrivateRoutes />} >
                
                    <Route path="/initial-page/*" element={<Layout><PaginaInicial /></Layout>} />
                    <Route path="/initial-page/*" element={<Layout><PaginaInicial /></Layout>} />
                    <Route path="/cad-users/*" element={<Layout><CadastraUsuarios /></Layout>} />
                    <Route path="/cad-products/*" element={<Layout><CadastraProdutos /></Layout>} />
                </Route>
            </Routes>  
        </Router>
    
    );
}

export default AppRoutes;
