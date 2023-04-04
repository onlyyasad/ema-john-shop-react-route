import React from 'react';

const Cart = ({cart}) => {
    let itemQuantity = 0;
    let total = 0;
    let shipping = 0;
    cart.map(product => {
        itemQuantity += product.quantity;
        total += product.price * product.quantity;
        shipping += product.shipping * product.quantity;
    })
    const tax = total * 0.1;
    const grandTotal = total + shipping + tax;

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold text-center'>Order Summery</h1>
            <div>
                <p>Selected Items: <span>{itemQuantity}</span></p>
                <p>Total Price: $<span>{total}</span> </p>
                <p>Total Shipping Charge: $<span>{shipping}</span> </p>
                <p>Tax: $<span>{tax.toFixed(2)}</span> </p>
                <p className='font-bold text-lg'>Grand Total: ${grandTotal.toFixed(2)}</p>
            </div>
            <div className='flex flex-col gap-2 '>
                <button className='btn normal-case'>Clear Cart</button>
                <button className='btn normal-case'>Review Order</button>
            </div>
        </div>
    );
};

export default Cart;