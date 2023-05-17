import React from 'react';

const Products = ({ product, handleAddToCart }) => {
    const { _id, img, name, price, seller, ratings } = product;
    return (
        <div className="card w-full bg-base-100">
            <figure><img src={img} alt="Product" /></figure>
            <div className="card-body p-2">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p>Price: $<span>{price}</span></p>
                <div >
                    <p className='text-sm'>Manufacturer: <span>{seller}</span></p>
                    <p className='text-sm'>Rating: <span>{ratings}</span></p>
                </div>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(_id)} className="btn w-full hover:text-orange-500">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Products;