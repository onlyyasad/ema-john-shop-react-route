import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../utilities/fakedb';


const Order = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const newCart = [];
        const storedCart = getShoppingCart()
        for (const id in storedCart) {
            const storedProduct = products.find(pd => pd.id === id);
            if (storedProduct) {
                storedProduct.quantity = storedCart[id];
                newCart.push(storedProduct)
            }
        }
        setCart(newCart)

    }, [products])

    const handleAddToCart = (id) => {
        let newCart = [];
        const cartProduct = products.find(pd => pd.id === id);
        const exist = cart.find(pd => pd.id === cartProduct.id);
        if (exist) {
            exist.quantity += 1;
            const remaining = cart.filter(pd => pd.id !== id);
            newCart = [...remaining, exist];
        }
        else {
            cartProduct.quantity = 1;
            newCart = [...cart, cartProduct];
        }
        setCart(newCart)
        addToDb(id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();

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
            <div className='bg-orange-200 col-span-4 sticky top-0 h-screen p-4'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                   <Link to='/order-review' className='flex-grow'><button className='btn normal-case'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;