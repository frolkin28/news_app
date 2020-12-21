import React from 'react';
import { Redirect } from "react-router-dom";
import UserContext from '../../util/context';
import './styles.css';


class Login extends React.Component {
    static contextType = UserContext;

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
        const { setUser } = this.context;
        let ok;
        const notEmpty = (
            (this.state.email !== "") &&
            (this.state.password !== "")
        );
        if (notEmpty) {
            const loginRequest = new Request(
                '/auth/login/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    })
                }
            )
            fetch(loginRequest)
                .then(res => {
                    if (res.status > 299) {
                        ok = false;
                    }
                    else {
                        ok = true;
                    }
                    return res.json();
                })
                .then(data => {
                    if (ok) {
                        setUser(data);
                    }
                    else {
                        let message = '';
                        for (let key in data) {
                            message += `\n${data[key]}`;
                        }
                        alert(message);
                    }
                });

        }
        else {
            console.log("Invalid data");
        }
    }


    render() {
        const { user } = this.context;

        if (user) return <Redirect to="/" exact />

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
                    <button className="submit" align="center" onClick={this.handleSubmit}>Login</button>
                </form>
            </div>
        );
    }
}


export default Login;