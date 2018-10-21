import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/login_page.css';
import { userActions } from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
      return (
        <div className="wrapper ">
            <div className="login-main-panel">
                <div className="card center-content">
                    <div className="card-header">
                    Login
                    </div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="card-body">
                            {/* <label htmlFor="username">Username</label> */}
                            <input placeholder="Username" type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />

                            {/* <label htmlFor="password">Password</label> */}
                            <input placeholder="Password" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-6 pr-md-1">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                <div className="col-md-6 pl-md-1">
                                    <button onClick={()=> {this.props.history.replace('/add_user')}} type="button" className="btn btn-link float-right align-middle">add user</button>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
          
      );
    }
  }
  
  function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 