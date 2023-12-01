import React, { useState } from "react";
import { useCart } from "../../contexts/cartContext";

const CarrinhoCompras = () => {
    const { cartItems, incrementQuantity, removeQuantity, removeFromCart } = useCart();

    return (
        <div className=" bg-black w-96">
            {
                cartItems.map((item) => (
                    <div key={item.id}>
                        <div>
                            <h1>{item.name}</h1>
                            <hr className='bg-greenBg w-68 border-none h-0.5 mt-1 mb-1'></hr>
                            <p>{item.description}</p>
                            <div>
                                <button className="button_remove2" onClick={() => removeFromCart(item.id)}>Excluir</button>
                            </div>
                        </div>

                        <div>
                            <h1>Quantidade</h1>
                            <button className="buttons_plus_minus" onClick={() => removeQuantity(item.id)}>-</button>
                            <div className="quantity">{item.quantity}</div>
                            <button className="buttons_plus_minus" onClick={() => incrementQuantity(item.id)}>+</button>
                        </div>

                        <div>
                        <h1>Valor Total</h1>
                        <p className="card-text">{parseFloat(item.price * item.quantity).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                            })}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CarrinhoCompras;