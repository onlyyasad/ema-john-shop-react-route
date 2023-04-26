import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.svg'
import { AuthContext } from '../providers/AuthProviders';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);

    const handleLogout = () =>{
        logOut()
        .then(() =>{})
        .catch(error => console.log(error.message))
    }
    
    return (
        <nav className='bg-gray-900 flex justify-between items-center px-4 py-2'>
            <Link to='/'> <img src={Logo} alt="" /> </Link>
            <div className='flex gap-4'>
                <Link className='text-white' to='/'>Shop</Link>
                <NavLink to='/order-review' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Orders
                </NavLink>
                <NavLink to='/manage-inventory' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Inventory
                </NavLink>
                {user? <><h4 className='text-orange-500'>{user.email}</h4>
                <button onClick={handleLogout} className="text-white">
                    Sign Out
                </button></> : <><NavLink to='/login' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Login
                </NavLink>
                <NavLink to='/register' className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>
                    Sign Up
                </NavLink></>}
            </div>
        </nav>
    );
};

export default Header;