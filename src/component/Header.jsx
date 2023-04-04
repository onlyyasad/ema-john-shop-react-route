import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.svg'

const Header = () => {
    return (
        <nav className='bg-gray-900 flex justify-between items-center px-4 py-2'>
            <Link to='/'> <img src={Logo} alt="" /> </Link>
            <div className='flex gap-4'>
                <Link className='text-white' to='/'>Order</Link>
                <NavLink to='/order-review' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Order Review
                </NavLink>
                <NavLink to='/manage-inventory' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Manage Inventory
                </NavLink>
                <NavLink to='/login' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Login
                </NavLink>
            </div>
        </nav>
    );
};

export default Header;