import React from 'react';
import './styles.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
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

    handleSubmit(event) {
        event.preventDefault();
        const notEmpty = (
            (this.state.email !== "") &&
            (this.state.firstName !== "") &&
            (this.state.lastName !== "") &&
            (this.state.password !== "") &&
            (this.state.confirmPassword !== "")
        );
        const equals = (this.state.password === this.state.confirmPassword);
        if (notEmpty && equals) {
            console.log("User registered");
        }
        else if (notEmpty) {
            console.log("Not equal passwords");
        }
        else {
            console.log("Invalid data");
        }
    }


    render() {
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