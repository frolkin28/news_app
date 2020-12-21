import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserContext from '../../util/context';
import Header from '../Header';
import Footer from '../Footer';
import NewsArea from '../NewsArea';
import Register from '../Register';
import Login from '../Login';
import NewsPage from '../NewsPage';


const authUserKey = 'authUser';


class App extends React.Component {
    state = {
        user: this.getAuthUser(),
    }


    getAuthUser() {
        const authUser = JSON.parse(localStorage.getItem(authUserKey));
        console.log(authUser);
        return authUser;
    }

    setUser = (user) => {
        this.setState((prevState) => {
            localStorage.setItem(authUserKey, JSON.stringify(user));
            return { user };
        })
    }

    render() {
        const { user } = this.state;
        const { setUser } = this;
    

        return (
            <UserContext.Provider value={{ user, setUser }}>
                <div className="App">
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={NewsArea} />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/page" component={NewsPage} />
                        </Switch>
                    </BrowserRouter>
                    <Footer />
                </div>
            </UserContext.Provider>
        )
    }
}


export default App;