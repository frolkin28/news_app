import React from 'react';
import './styles.css';

class Header extends React.Component {
    render() {
        return (
                <header>
                    <div class="logo">
                        <h1>Travel<span>Blog</span></h1>
                    </div>
                    <nav>
                        <div><a href="#">Sing In</a></div>
                        <div><a href="#">Sign Up</a></div>
                    </nav>
                </header>
        )
    }
}

export default Header;