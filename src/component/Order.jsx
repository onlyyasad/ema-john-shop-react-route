import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import { addToDb } from '../utilities/fakedb';


// Issue found: Don't add to cart on first click

const Order = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    const handleAddToCart = (id) => {
        let newCart = [...cart];
        const cartProduct = products.find(pd => pd.id === id);
        const exist = newCart.find(pd => pd.id === cartProduct.id);
        if (exist) {
            exist.quantity += 1;
            const remaining = newCart.filter(pd => pd.id !== id);
            newCart = [...remaining, exist];
            setCart(newCart)
        }
        else {
            newCart.push(cartProduct);
            setCart(newCart);
        }
        addToDb(id)
    }
    return (
        <div className='md:grid grid-cols-12 relative'>
            <div className='bg-gray-200 col-span-8 p-4'>
                <div className='md:grid grid-cols-3 gap-4'>
                    {
                        products.map(product => <Products key={product.id} product={product} handleAddToCart={handleAddToCart}></Products>)
                    }
                </div>
            </div>
            <div className='bg-red-200 col-span-4 sticky top-0 h-screen p-4'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Order;