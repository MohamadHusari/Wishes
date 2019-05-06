import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import AuthService from './AuthService';

class SignInForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }
    componentDidMount() {
        // console.log('signup ,mmm');
        console.log(this.props);
        document.title = 'WixWishes - Account Sign In';
    }
    componentWillMount() {
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <>
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text" id="inputUsername" className="form-control" name="username"
                               placeholder="Username" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" name="password"
                               placeholder="Password" required onChange={this.handleChange} />
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember
                            password</label>
                    </div>
                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                            type="submit">Sign in
                    </button>
                    <span className="d-block text-center mt-2">
                        Don't have an account
                    <Link className="d-inline-block ml-2" to="/account/signup">Sign Up</Link>
                    </span>
                    <hr/>
                    <button className="btn btn-lg btn-google btn-block text-uppercase"
                            type="submit"><FontAwesomeIcon icon={["fab","google"]}/> Sign in with Google
                    </button>
                    <button className="btn btn-lg btn-facebook btn-block text-uppercase"
                            type="submit"><FontAwesomeIcon icon={["fab","facebook"]} className="mr-2"/>Sign in with
                        Facebook
                    </button>
                </form>
            </>
        );
    }
}

export default SignInForm;