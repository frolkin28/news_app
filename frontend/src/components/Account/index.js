import React from 'react';
import { Redirect, NavLink } from "react-router-dom";
import UserContext from '../../util/context';
import './styles.css';


class Account extends React.Component {
    static contextType = UserContext;

    render() {
        const { user } = this.context;

        if (!user) return <Redirect to="/login" />

        return (
            <div className="account-page">
                <div className="account-area">
                    <div className="account-title">
                        <h1>Your account</h1>
                    </div>
                    <div className="account-data">
                        <h3 className="account-data-item">
                            Email:  {`${user.email}`}
                        </h3>
                        <h3 className="account-data-item">
                            First name:  {`${user.first_name}`}
                        </h3>
                        <h3 className="account-data-item">
                            Last name:  {`${user.last_name}`}
                        </h3>
                    </div>
                    <div className="account-recent-uploaded-news">
                        <h1>Recent uploaded news</h1>
                    </div>
                </div>
                <div className="create-news-button-area">
                    <NavLink to="/create-news" className="create-news-button">Create news</NavLink>
                </div>
            </div>
        )
    }
}

export default Account;