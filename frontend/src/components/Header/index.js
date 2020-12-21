import { NavLink } from 'react-router-dom';
import React from 'react';
import UserContext from '../../util/context';
import './styles.css';

class Header extends React.Component {
    static contextType = UserContext

    render() {
        let { user } = this.context;
        if (user == null) {
            user = false;
        }

        return (
            <header className="header">
                <div className="logo">
                    <h1>
                        <NavLink to="/" exact className="logo-link" activeClassName="logo-link">
                            News<span>Portal</span>
                        </NavLink>
                    </h1>
                </div>
                { user
                    ? (
                        <nav>
                            <div>{`${user.first_name} ${user.last_name}`}</div>
                        </nav>
                    )
                    :
                    (
                        <nav>
                            <div><NavLink to="/register">Register</NavLink></div>
                            <div><NavLink to="/login">Login</NavLink></div>
                        </nav>
                    )
                }


            </header >
        );
    }
}

export default Header;