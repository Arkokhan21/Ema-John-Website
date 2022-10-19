import React, { useContext } from 'react';
import logo from '../../images/Logo.svg';
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/Usercontext';

const Header = () => {

    const { logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    const { user } = useContext(AuthContext)

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {user?.uid ?
                    <Link onClick={handleSignOut}>Sign Out</Link>
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                }
            </div>
        </nav >
    );
};

export default Header;