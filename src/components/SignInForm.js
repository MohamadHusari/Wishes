import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import AuthService from './AuthService';
import validator, { field } from './validator';
import { Form, InputGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { faUser, faPassport } from "@fortawesome/free-solid-svg-icons";


class SignInForm extends Component {
    constructor() {
        super();
        this.state = {
            username:    field({value: '', name: 'username'}),
            Password:  field({value: '', name: 'Password'}),
            date:   field({value: '', name: 'date'}),
            where:   field({value: '', name: 'where'})
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.Auth = new AuthService();
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    onInputChange({ target: { name, value } }) {    
        this.setState({
          [name]: {
            ...this.state[name],
            value,
            ...validator(value, name, this.state[name].validations)
          }
        });
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
                    <Form.Group controlId="formControlEmail">
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="username"
                            placeholder="Enter your mail"
                            aria-label="Username"
                            defaultValue={this.state.username.value}
                            onBlur={this.onInputChange}
                            />
                        </InputGroup>
                        {this.state.username.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                            {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="formControlEmail">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faPassport} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="Password"
                            type="password"
                            placeholder="Enter your Password"
                            aria-label="password"
                            defaultValue={this.state.Password.value}
                            onBlur={this.onInputChange}
                            />
                        </InputGroup>
                        {this.state.Password.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                            {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

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