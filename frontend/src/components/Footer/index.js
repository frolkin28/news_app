import React from 'react';
import './styles.css';


class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer_p1">
                    <p>
                        Copyright 2020
                    </p>
                </div>
                <div className="footer_p2">
                    <p>
                        Design and coding
                        by Volodymyr Frolkin
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer;