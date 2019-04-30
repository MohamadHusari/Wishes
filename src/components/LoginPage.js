import React, { Component } from 'react';

import '../style/Login.css';
import AuthService from './AuthService';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { fagoo, faKey } from '@fortawesome/free-solid-svg-icons';
library.add(faGoogle, faFacebook);


class LoginPage extends Component {
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
        // console.log(this.props);
        document.title = 'WixWishes - Login Page';
        // document.body.classList.add('bg-light');
    }
    componentWillMount() {
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    componentWillUnmount() {
        // document.body.classList.remove('bg-light');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin" onSubmit={this.handleFormSubmit}>
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

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember
                                                password</label>
                                    </div>
                                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                                            type="submit">Sign in
                                    </button>
                                    <hr className="my-4"/>
                                        <button className="btn btn-lg btn-google btn-block text-uppercase"
                                                type="submit"><FontAwesomeIcon icon={["fab","google"]}/> Sign in with Google
                                        </button>
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase"
                                                type="submit"><FontAwesomeIcon icon={["fab","facebook"]} className="mr-2"/>Sign in with
                                            Facebook
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;