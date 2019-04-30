import React, { Component } from 'react';
// import {withRouter} from "react-router-dom";
import AuthService from './AuthService';

export default function PrivateRoute(AuthComponent) {
    const Auth = new AuthService('http://localhost:8080');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    })
                } catch (err) {
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }
        render() {
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props} user={this.state.user} />
                )
            }
                return null;
        }
    }
}