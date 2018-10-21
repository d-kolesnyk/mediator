import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/login_page.css';
import { userActions } from '../actions';

class AddUserPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            code_1_password: '',
            code_2_password: '',
            code_3_password: '',
            code_4_password: '',
            code_5_password: '',
            code_6_password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log(e)
        this.setState({ submitted: true });
        const { username, password, code_1_password } = this.state;
        const { dispatch } = this.props;
        if (username && password && code_1_password) {
            dispatch(userActions.add_new_user(username, password, code_1_password));
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { loggingIn } = this.props;
        const { 
            username, 
            password, 
            submitted, 
            re_password, 
            code_1_password, 
            code_2_password, code_3_password, code_4_password, code_5_password, code_6_password} = this.state;
      return (
        <div className="wrapper ">
            <div className="login-main-panel">
                <div className="card center-content">
                    <div className="card-header">
                    Add user
                    </div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="card-body">
                            {/* <label htmlFor="username">Username</label> */}
                            <input placeholder="Username" type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />

                            {/* <label htmlFor="password">Password</label> */}
                            <input placeholder="Password" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />

                            <input placeholder="Repeat Password" type="password" className="form-control" name="re_password" value={re_password} onChange={this.handleChange} />

                            
                            <div className="row">
                                <div className="col-md-12 pr-md-1">
                                    <label>System box code</label>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_1_password" value={code_1_password} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_2_password" value={code_2_password} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_3_password" value={code_3_password} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_4_password" value={code_4_password} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_5_password" value={code_5_password} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2 pr-md-1">
                                    <input maxlength="2" type="password" className="form-control" name="code_6_password" value={code_6_password} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-6 pr-md-1">
                                    <button className="btn btn-primary btn-block">Add user</button>
                                </div>
                                <div className="col-md-6 pr-md-1">
                                    <button onClick={()=> {this.props.history.replace('/login')}} className="btn btn-danger btn-block">Cancel</button>
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

const connectedAddUserPage = connect(mapStateToProps)(AddUserPage);
export { connectedAddUserPage as AddUserPage }; 