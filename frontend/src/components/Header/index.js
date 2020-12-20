import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import './styles.css';

class Header extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <header>
                    <div className="logo">
                        <h1>
                            News<span>Application</span>
                        </h1>
                    </div>
                    <nav>
                        <div><Link to="/register">Register</Link></div>
                        <div><Link to="/login">Login</Link></div>
                    </nav>
                </header>

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Header;