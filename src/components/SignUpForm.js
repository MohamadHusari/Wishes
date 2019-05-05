import React, { Component } from 'react';
import AuthService from './AuthService';

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
            <h1>Mohamad Husari</h1>
        );
    }
}

export default SignUpForm;