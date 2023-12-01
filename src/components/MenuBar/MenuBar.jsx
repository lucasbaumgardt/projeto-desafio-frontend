import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import folhaverde from '../../assets/folinha-verde.svg';
import cart from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import logout from '../../assets/logout.svg';
import close from '../../assets/close.svg';
import CarrinhoCompras from '../../pages/Carrinho/Carrinho';

function MenuBar () {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customStyles = {
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '75%',
          height: '85vh',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#0A0A0A',
          border: '2px solid #509D46',
          borderRadius: '15px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
        },
    };

    return (
        <nav className="fixed top-0 left-0 bg-menubar z-10 w-24 h-screen p-4 border-r-2 border-borderRight outline-none">
            <div className='flex flex-col items-center'>
                <img className="w-12 h-20 mt-2" src={folhaverde}></img>
                <img className="w-12 mt-8" src={cart} onClick={() => setModalIsOpen(true)}></img>
                <img className="w-12 mt-8" src={clock}></img>
                <img className="w-12 absolute bottom-8" src={logout}></img>
            </div>
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Galeria de Imagens"
                style={customStyles}
                >
                <img src={close} className='absolute right-5 m-1 cursor-pointer' onClick={() => setModalIsOpen(false)}></img>

                <CarrinhoCompras/>
                
            </Modal>
        </nav> 
    )
}

export default MenuBar;