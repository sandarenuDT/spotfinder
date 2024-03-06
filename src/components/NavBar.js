import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar.css';
import logoImage from '../images/Logo.jpeg';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src={logoImage} alt="Logo" className="navbar-logo" style={{ width: '100px', borderRadius: '100px', marginLeft:'10px' }} />
            </div>
            <div className='NavBarCentering'>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink to="/home/:email" activeClassName="active" className="navbar-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/about" activeClassName="active" className="navbar-link">
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-account/:email" activeClassName="active" className="navbar-link">
                            My Account
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-buttons">
                <NavLink to="/registration" activeClassName="active" className="register-button">
                    Registration
                </NavLink>
                <NavLink to="/login" activeClassName="active" className="login-button">
                    Login
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
