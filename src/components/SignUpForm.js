import React, { Component } from 'react';
import AuthService from './AuthService';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class SignUpForm extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
    componentDidMount() {
        console.log(this.props);
    }
    componentWillMount() {
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    componentWillUnmount() {
        this.props.action();
    }

    render() {
        return (
            <>
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputDisplayName">Display Name</label>
                        <input type="text" id="inputDisplayName" className="form-control" name="displayname"
                               placeholder="Display Name" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="text" id="inputEmail" className="form-control" name="username"
                               placeholder="Email address" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" name="password"
                               placeholder="Password" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="verifyPassword">Verify Password</label>
                        <input type="password" id="verifyPassword" className="form-control" name="verifyPassword"
                               placeholder="verify Password" required onChange={this.handleChange} />
                    </div>

                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                            type="submit">Create New Account
                    </button>
                    <span className="d-block text-center mt-2">
                        have an account
                    <Link className="d-inline-block ml-2" to="/account/signin" onClick={() => this.props.action()}>Sign In</Link>
                    </span>
                    <hr/>

                </form>
            </>
        );
    }
}

export default SignUpForm;