import React from 'react';

const ReviewItems = ({ product, handleRemoveProduct }) => {
    const {id, img, price, name, shipping, quantity} = product;
    return (
        <div className="card flex-row items-center bg-base-100 border-2 p-4">
            <figure><img className='h-24 rounded-xl' src={img} alt="Movie" /></figure>
            <div className="px-4 flex-grow">
                <h2 className="card-title">{name}</h2>
                <p>Price: <span>${price}</span></p>
                <p>Shipping: <span>${shipping}</span></p>
                <p>Quantity: <span>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveProduct(id)} className="btn-circle btn-primary">X</button>
        </div>
    );
};

export default ReviewItems;