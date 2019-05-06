import React, { Component } from 'react';

import '../style/Account.css';
import AuthService from './AuthService';
import { Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { fagoo, faKey } from '@fortawesome/free-solid-svg-icons';
library.add(faGoogle, faFacebook);


function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} GlobalActions={route.GlobalActions}/>
            )}
        />
    );
}

class AccountPage extends Component {
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
        document.title = 'WixWishes - Account';
        console.log(this.props);
        // document.body.classList.add('bg-light');
    }
    componentWillMount() {
        // if(this.Auth.loggedIn())
        //     this.props.history.replace('/');
        if(this.props.location.pathname !== '/account/signin' )
            if(this.props.location.pathname !== '/account/signup')
                this.props.history.replace('/');
    }

    // componentWillUnmount() {
    //     // document.body.classList.remove('bg-light');
    // }



    render() {
        const {routes} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route}  />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountPage;