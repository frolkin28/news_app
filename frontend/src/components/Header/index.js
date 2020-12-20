import {NavLink } from 'react-router-dom';
import React from 'react';
import './styles.css';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="logo">
                    <h1>
                        <NavLink to="/" exact>
                            News<span>Application</span>
                        </NavLink>
                    </h1>
                </div>
                <nav>
                    <div><NavLink to="/register">Register</NavLink></div>
                    <div><NavLink to="/login">Login</NavLink></div>
                </nav>
            </header>
        );
    }
}

export default Header;