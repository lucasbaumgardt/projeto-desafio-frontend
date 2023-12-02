import React, { useState } from "react";
import '../../App.css';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../contexts/Cart/cartContext";

const CarrinhoCompras = () => {
    const { cartItems, incrementQuantity, removeQuantity, removeFromCart } = useCart();

    const calcularSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.value * item.quantity), 0)
      }

    return (
        <div>
            <div className="flex flex-col items-center p-10 m-8 overflow-auto scroll-cart h-cart-itens">
                
                <div className="w-full flex flex-col gap-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="w-full h-52 bg-cart-color1 flex flex-row items-center justify-between p-4 border-2 border-green1 rounded-borderCustom outline-none">
                        <div className="w-cart-width2 flex flex-col m-1">
                            <h1 className="font-primary text-white text-[25px]">{item.name}</h1>
                            <hr className='bg-greenBg w-hr-cart border-none h-0.5 mt-1 mb-1'></hr>
                            <p className="text-white">{item.description}</p>
                            
                            <button className="bg-red-800 w-24 h-10 mt-14 text-white rounded-borderCustom2 outline-none" onClick={() => removeFromCart(item.id)}>Excluir</button>
                            
                        </div>

                        <div className="w-cart-width2 flex flex-row justify-center items-center gap-20 m-10">
                            <div className="flex flex-col items-center gap-2">
                                <h1 className="font-primary text-white text-[20px]">Quantidade</h1>
                                <div className="flex flex-row items-center gap-5">
                                    <AiOutlineMinus className="text-white text-[30px] cursor-pointer" onClick={() => removeQuantity(item.id)}/>
                                    <div className="flex flex-row items-center justify-center w-16 h-10 mt-2 bg-black border-2 border-greenBg rounded-borderCustom3 text-white">{item.quantity}</div>
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
            <div className="flex flex-row gap-10 items-center float-right mr-20 -mt-4">
                <h1 className="text-white text-[25px] font-primary">Valor Total: {calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                <button className="w-64 h-14 bg-green1 text-white text-[22px] font-primary rounded-borderCustom">Finalizar Compra</button>
            </div>
        </div>
    )
}

export default CarrinhoCompras;