import React from 'react';
import { Redirect } from "react-router-dom";
import UserContext from '../../util/context';
import './styles.css';

class Register extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            isRegestred: false,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState(
            { email: event.target.value }
        );
    }

    handleFirstNameChange(event) {
        this.setState(
            { firstName: event.target.value }
        );
    }

    handleLastNameChange(event) {
        this.setState(
            { lastName: event.target.value }
        );
    }

    handlePasswordChange(event) {
        this.setState(
            { password: event.target.value }
        );
    }

    handleConfirmPasswordChange(event) {
        this.setState(
            { confirmPassword: event.target.value }
        );
    }

    setAuthUser(data) {
        localStorage.setItem("authUser", JSON.stringify(data));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { setUser } = this.context;
        let ok;
        const notEmpty = (
            (this.state.email !== "") &&
            (this.state.firstName !== "") &&
            (this.state.lastName !== "") &&
            (this.state.password !== "") &&
            (this.state.confirmPassword !== "")
        );
        const equals = (this.state.password === this.state.confirmPassword);
        if (notEmpty && equals) {
            const registerRequest = new Request(
                '/auth/register/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                    })
                }
            );

            fetch(registerRequest)
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
        else if (notEmpty) {
            alert("Not equal passwords");
        }
        else {
            alert("Invalid data");
        }
    }


    render() {

        const { user } = this.context;

        if (user) return <Redirect to="/" exact />

        return (
            <div className="main">
                <p className="sign" align="center">Register</p>
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
                        className="un "
                        type="text"
                        align="center"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                    />
                    <input
                        className="un "
                        type="text"
                        align="center"
                        placeholder="Last name"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                    />
                    <input
                        className="pass"
                        type="password"
                        align="center"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <input
                        className="pass"
                        type="password"
                        align="center"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                    />
                    <button className="submit" align="center" onClick={this.handleSubmit}>Register</button>
                </form>
            </div>
        );
    }
}


export default Register;