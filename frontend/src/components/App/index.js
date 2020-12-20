import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import NewsArea from '../NewsArea';
import Register from '../Register';
import Login from '../Login';


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                        <Switch> 
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/" exact component={NewsArea} />
                        </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}


export default App;