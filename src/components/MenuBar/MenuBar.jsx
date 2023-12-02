import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import folhaverde from '../../assets/folinha-verde.svg';
import cart from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import adminicon from '../../assets/admin.svg';
import logout from '../../assets/logout.svg';
import close from '../../assets/close.svg';
import flecha from '../../assets/flecha.svg'; 
import cart2 from '../../assets/cart2.svg';
import CarrinhoCompras from '../../pages/Carrinho/Carrinho';
import { useCart } from '../../contexts/Cart/cartContext';

function MenuBar () {

    const {cartItems} = useCart();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [isMenuVisible, setMenuVisible] = useState(false);

    const navigate = useNavigate();

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

    const navigateToPageCadUsers = () => {
        navigate("/cad-users");
    }

    const navigateToPageCadProducts = () => {
        navigate("/cad-products");
    }

    return (
        <nav className="fixed top-0 left-0 bg-menubar z-10 w-24 h-screen p-4 border-r-2 border-borderRight outline-none">
            <div className='flex flex-col items-center'>
                <img className="w-16 h-20 mt-2" src={folhaverde}></img>
                <img className="w-12 mt-8 cursor-pointer" src={cart} onClick={() => setModalIsOpen(true)}></img>
                <img className="w-12 mt-8 cursor-pointer" src={clock}></img>
                <img className="w-10 mt-8 cursor-pointer" src={adminicon} onClick={() => setMenuVisible(true)}></img>
                <img className="w-12 absolute bottom-8 cursor-pointer" src={logout}></img>
            </div>

            {isMenuVisible && (
            <div className="fixed top-0 left-24 w-80 h-screen bg-menubar text-white p-4 border-r-2 border-borderRight outline-none">
                <img src={flecha} className='w-12 m-2 cursor-pointer' onClick={() => setMenuVisible(false)}></img>
                <div className='flex flex-col items-center gap-8 mt-16'>
                    <button className='w-64 h-14 bg-green1 font-primary text-[22px] rounded-borderCustom3' onClick={navigateToPageCadUsers}>Usuários</button>
                    <button className='w-64 h-14 bg-green1 font-primary text-[22px] rounded-borderCustom3' onClick={navigateToPageCadProducts}>Produtos</button>
                </div>
            </div>
            )}
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Carrinho de Compras"
                style={customStyles}
                >
                <img src={close} className='absolute right-5 -m-1 cursor-pointer' onClick={() => setModalIsOpen(false)}></img>
                    
                {cartItems.length === 0 ? (
                    <div className='flex items-center bg-cart-color1 h-cart-height1 m-10 border-none rounded-borderCustom outline-none'>
                        
                        <div className='flex flex-col items-center gap-8 mx-auto my-auto'>
                            <h1 className="text-white font-primary text-[50px]">Ops...</h1>
                            <h3 className=' w-96 text-cartmessage font-primary text-[30px] text-center'>Nada foi adicionado ao seu carrinho ainda</h3>
                            <p to="/initial-page" className='text-green1 font-primary text-[20px] link-decor cursor-pointer' onClick={() => setModalIsOpen(false)}>Adicionar Produtos</p>
                            <img src={cart2} alt='carrinho-vazio' className='w-64'></img>
                        </div>

                    </div>
                ) : (
                    
                    <CarrinhoCompras />
                    
                )}

            </Modal>
        </nav> 
    )
}

export default MenuBar;