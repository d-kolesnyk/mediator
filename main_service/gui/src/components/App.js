import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css"
import '../css/app.css';

import { LoginPage } from "./LoginPage";
import { AddUserPage } from "./AddUserPage";
import HomePage from "./HomePage";

import { history } from '../helpers';
import { alertActions } from '../actions'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
    }

  render() {
    const { alert } = this.props;
    return (
            <Router history={history}>
                <div>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/add_user" component={AddUserPage} />
                </div>
            </Router> 
    );
  }
}

// export default App;

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(null, mapStateToProps)(App);
export { connectedApp as App }; 
