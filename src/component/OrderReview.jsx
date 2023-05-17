import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import ReviewItems from './ReviewItems';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../utilities/fakedb';

const OrderReview = () => {

    const savedCart = useLoaderData();

    const [cart, setCart] = useState(savedCart)

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    const handleRemoveProduct =(id) =>{
        const remaining = cart.filter(pd => pd._id !== id);
        setCart(remaining);
        removeFromDb(id)
    }



    return (
        <div className='md:grid grid-cols-12 p-10'>
            <div className='col-span-7 flex flex-col gap-4 p-6'>
                {
                    cart.map(product => <ReviewItems key={product._id} product={product} handleRemoveProduct={handleRemoveProduct}></ReviewItems>)
                }
            </div>
            <div className='col-span-5 sticky top-0 h-screen'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                   <Link to='/checkout'><button className='btn normal-case'>Proceed Checkout</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;