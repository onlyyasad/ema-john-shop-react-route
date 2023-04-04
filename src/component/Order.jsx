import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Order = () => {
    return (
        <>
        <Header></Header>
        <Outlet></Outlet>
        </>
    );
};

export default Order;