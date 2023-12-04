import React, { useState } from "react";
import Modal from 'react-modal';
import '../../App.css';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../contexts/Cart/cartContext";

const CarrinhoCompras = () => {
    const { cartItems, incrementQuantity, removeQuantity, removeFromCart } = useCart();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleShowModal = (productId) => {
        setProductToDelete(productId);
        setModalIsOpen(true);
      };
    
    const handleCloseModal = () => {
        setProductToDelete(null);
        setModalIsOpen(false);
    };

    const handleDeleteProduct = () => {
        if (productToDelete) {
            removeFromCart(productToDelete);
            handleCloseModal();
        }
    };
    

    const calcularSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.value * item.quantity), 0)
    }

    const customStyles = {
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '40%',
          height: '20vh',
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

    return (
        <div>
            <div className="flex flex-col items-center p-10 m-8 overflow-auto scroll-cart h-[70vh]">
                
                <div className="w-full flex flex-col gap-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="w-full h-52 bg-grey2 flex flex-row items-center justify-between p-4 border-2 border-green1 rounded-[15px] outline-none">
                        <div className="w-[50%] flex flex-col m-1">
                            <h1 className="font-primary text-white text-[25px]">{item.name}</h1>
                            <hr className='bg-green1 w-[100%] border-none h-0.5 mt-1 mb-1'></hr>
                            <p className="text-white">{item.description}</p>
                            
                            <button className="bg-red-800 w-24 h-10 mt-10 text-white rounded-[10px] outline-none" onClick={() => handleShowModal(item.id)}>Excluir</button>
                            
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                contentLabel="Carrinho de Compras"
                                style={customStyles}
                                >
                                <div className="w-full h-full flex flex-col justify-center items-center gap-6">
                                    <h1 className="text-white text-[25px] font-primary">Deseja tirar esse produto do carrinho?</h1>

                                    <div className="flex flex-row justify-between gap-20">
                                        <button className="w-60 h-14 bg-red-800 rounded-[5px] text-white text-[20px] font-primary" onClick={handleCloseModal}>Não</button>
                                        <button className="w-60 h-14 bg-green1 rounded-[5px] text-white text-[20px] font-primary" onClick={handleDeleteProduct}>Sim</button>
                                    </div>
                                </div>
                            </Modal>
                        </div>

                        <div className="w-[50%] flex flex-row justify-center items-center gap-20 m-10">
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="font-primary text-white text-[20px]">Quantidade</h1>
                                <div className="flex flex-row items-center gap-5">
                                    <AiOutlineMinus className="text-white text-[30px] cursor-pointer" onClick={() => removeQuantity(item.id)}/>
                                    <div className="flex flex-row items-center justify-center w-16 h-10 mt-2 bg-black border-2 border-green1 rounded-[5px] text-white">{item.quantity}</div>
                                    <AiOutlinePlus className="text-white text-[30px] cursor-pointer" onClick={() => incrementQuantity(item.id)}/>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center gap-6">
                                <h1 className="font-primary text-white text-[20px]">Valor Total</h1>
                                <p className="font-primary text-white text-[20px]">{parseFloat(item.value * item.quantity).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                                })}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="flex flex-row gap-10 items-center float-right mr-20 -mt-6">
                <h1 className="text-white text-[25px] font-primary">Valor Total: {calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                <button className="w-64 h-14 bg-green1 text-white text-[22px] font-primary rounded-[15px]">Finalizar Compra</button>
            </div>
        </div>
    )
}

export default CarrinhoCompras;