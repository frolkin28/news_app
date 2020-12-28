import { NavLink } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';
import UserContext from '../../util/context';
import Dropdown from '../Dropdown';
import './styles.css';

class Header extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const { setUser } = this.context

        const token = Cookies.get('csrftoken');
        if (token) {
            const logoutRequest = new Request(
                '/auth/logout/',
                {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': token,
                    },
                }
            );
            fetch(logoutRequest)
                .then(res => {
                    if (res.status < 299) {
                        setUser(null);
                    }
                    else {
                        alert('Someting went wrong');
                    }
                });
        }
        else {
            alert('You are already logged out');
        }
    }

    render() {
        let { user } = this.context;
        let navComponent;
        if (user) {
            navComponent = (
                <nav>
                    <div className="user-name">
                        <NavLink to="/account">
                            {`${user.first_name} ${user.last_name}`}
                        </NavLink>
                    </div>
                    <div className="logout" onClick={this.logout}>Logout</div>
                </nav>
            )
        }
        else {
            navComponent = (
                <nav>
                    <div><NavLink to="/register">Register</NavLink></div>
                    <div><NavLink to="/login">Login</NavLink></div>
                </nav>
            )
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
                <Dropdown />
                {navComponent}
            </header >
        );
    }
}

export default Header;