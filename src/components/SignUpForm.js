import React, { Component } from 'react';
import AuthService from './AuthService';
import {Link} from "react-router-dom";
import validator, { field } from './validator';
import { Form, InputGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { faUser, faPassport } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class SignUpForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Auth = new AuthService();
        this.state = {
            uploading: false,
            image: 'https://res.cloudinary.com/yallablagan/image/upload/c_thumb,w_200,g_face/v1557105634/MemberDefault_l8iaju.jpg',
            FirstName:    field({value: '', name: 'FirstName'}),
            LastName:  field({value: '', name: 'LastName'}),
            Password:   field({value: '', name: 'Password'}),
            Password2:   field({value: '', name: 'Password2'}),
            username:   field({value: '', name: 'username'})
        }
        this.onInputChange = this.onInputChange.bind(this);
    }
    componentDidMount() {
        console.log(this.props);
    }
    componentWillMount() {
        this.props.GlobalActions.ChangeNavWordAction();
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    componentWillUnmount() {
        this.props.GlobalActions.ChangeNavWordAction();
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
    onChange = e => {
        const files = Array.from(e.target.files);
        this.setState({ uploading: true });

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file);
        });
        this.Auth.fetch(false,`${this.Auth.domain}/imageupload`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                this.setState({
                    uploading: false,
                    image: res.image
                })
            })
    };

    render() {
        return (
            <>
                <h5 className="card-title text-center">Sign Up</h5>
                <div className="profile-img">
                    <img className="img-thumbnail"
                        src={this.state.image}
                        alt=""/>
                    <div className="file btn btn-lg btn-primary">
                        Change Photo
                        <input type="file" accept="image/*" name="file" onChange={this.onChange}/>
                    </div>
                </div>
                <form className="form-signin" onSubmit={this.handleFormSubmit}>

                    <Form.Group controlId="formControlEmail">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="FirstName"
                            placeholder="Enter your First Name"
                            aria-label="FirstName"
                            defaultValue={this.state.FirstName.value}
                            onBlur={this.onInputChange}
                            onChange={this.handleChange}
                            />
                        </InputGroup>
                        {this.state.FirstName.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                            {err}
                            </Form.Text>
                        ))}
                    </Form.Group>


                    <Form.Group controlId="formControlEmail">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="LastName"
                            placeholder="Enter your Last Name"
                            aria-label="LastName"
                            defaultValue={this.state.LastName.value}
                            onBlur={this.onInputChange}
                            onChange={this.handleChange}
                            />
                        </InputGroup>
                        {this.state.LastName.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                            {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="formControlEmail">
                        <Form.Label>User Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="username"
                            type="text"
                            placeholder="Enter Your UserName"
                            aria-label="password2"
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

                    <Form.Group controlId="formControlEmail">
                        <Form.Label>Re-Enter a Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faPassport} />
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            name="Password2"
                            type="password2"
                            placeholder="Verify your Password"
                            aria-label="password2"
                            defaultValue={this.state.Password2.value}
                            onBlur={this.onInputChange}
                            />
                        </InputGroup>
                        {this.state.Password2.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                            {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                            type="submit">Create New Account
                    </button>
                    <span className="d-block text-center mt-2">
                        Have an account
                    <Link className="d-inline-block ml-2" to="/account/signin">Sign In</Link>
                    </span>
                </form>
            </>
        );
    }
}

export default SignUpForm;