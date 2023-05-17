import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../utilities/fakedb';


const Order = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { totalProducts } = useLoaderData();


    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumbers = [...Array(totalPages).keys()];
    const options = [5, 10, 20];

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);

        }
        fetchData();
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const newCart = [];
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsById', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(loadedCartProducts => {
                for (const _id in storedCart) {
                    const storedProduct = loadedCartProducts.find(pd => pd._id === _id);
                    if (storedProduct) {
                        storedProduct.quantity = storedCart[_id];
                        newCart.push(storedProduct)
                    }
                }
                setCart(newCart)
            })



    }, [])

    const handleAddToCart = (id) => {
        let newCart = [];
        const cartProduct = products.find(pd => pd._id === id);
        const exist = cart.find(pd => pd._id === cartProduct._id);
        if (exist) {
            exist.quantity += 1;
            const remaining = cart.filter(pd => pd._id !== id);
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

    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }


    return (
        <div className='md:grid grid-cols-12 relative'>
            <div className='bg-gray-200 col-span-8 p-4'>
                <div className='md:grid grid-cols-3 gap-4'>
                    {
                        products.map(product => <Products key={product._id} product={product} handleAddToCart={handleAddToCart}></Products>)
                    }
                </div>
                <div>

                </div>
                <div className='flex mt-10 justify-center'>
                    <div className="btn-group">
                        {
                            pageNumbers.map(number => <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? "btn btn-active" : "btn"}>{number}</button>)
                        }
                    </div>
                    <div className='ms-4'>
                        <select className='h-12 p-2' name="" id="" value={itemsPerPage} onChange={handleSelectChange}>
                            {
                                options.map(option => <option key={option} value={option}>{option}</option>)
                            }
                        </select>
                    </div>
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