import React, { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import close from '../../assets/close.svg';

const CarrinhoItens = () => {
    const { cartItems, incrementQuantity, removeQuantity } = useCart();

    return (
        <div className=" bg-black w-96">
            {cartItems.map((item) => (
                <div>
                    <h1></h1>
                    <p>e</p>
                    <p>e</p>
                    <p>e</p>
                </div>
            ))}
        </div>
    )
}

const CarrinhoCompras = () => {
    return (
        <CarrinhoItens/>
    )
}

export default CarrinhoCompras;