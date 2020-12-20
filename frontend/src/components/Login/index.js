import React from 'react';
import './styles.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState(
            { email: event.target.value }
        );
    }

    handlePasswordChange(event) {
        this.setState(
            { password: event.target.value }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const notEmpty = (
            (this.state.email !== "") &&
            (this.state.password !== "")
        );
        if (notEmpty) {
            console.log("User logged in");
        }
        else {
            console.log("Invalid data");
        }
    }


    render() {
        return (
            <div className="main-login">
                <p className="sign" align="center">Login</p>
                <form className="form1">
                    <input
                        className="un "
                        type="text"
                        align="center"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        className="pass"
                        type="password"
                        align="center"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <button className="submit" align="center" onClick={this.handleSubmit}>Register</button>
                </form>
            </div>
        );
    }
}


export default Login;