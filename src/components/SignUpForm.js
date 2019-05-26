import React, { Component } from 'react';
import AuthService from './AuthService';
import {Link} from "react-router-dom";
import validator, { field } from './validator';
import { Form, InputGroup } from "react-bootstrap";
import { faUser, faPassport } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast, ToastContainer} from "react-toastify";


class SignUpForm extends Component {
    constructor() {
        super();
        // this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            uploading: false,
            image: 'https://res.cloudinary.com/yallablagan/image/upload/c_thumb,w_200,g_face/v1557105634/MemberDefault_l8iaju.jpg',
            firstname:    field({value: '', name: 'firstname'}),
            lastname:  field({value: '', name: 'lastname'}),
            password:   field({value: '', name: 'password'}),
            password2:   field({value: '', name: 'password2'}),
            username:   field({value: '', name: 'username'})
        };
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
    // handleChange(e){
    //     this.setState(
    //         {
    //             [e.target.name]: e.target.value
    //         }
    //     )
    // }
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        let isokey = true;
        let password = "";
        let password2 = "";
        const user = Object.assign({},{username:this.state.username, password:this.state.password,
            firstname:this.state.firstname, lastname:this.state.lastname, password2:this.state.password2});
        for(let key in user){
            const { value, validations } = user[key];
            const { valid, errors } = validator(value, key, validations);
            if (key === 'password'){
                password = user[key].value;
            }
            if(key === 'password2')  {
                password2 = user[key].value;
            }
            // console.log(valid,errors);
            if(!valid){
                user[key].valid = valid;
                user[key].errors = errors;
                isokey = false;
            }
        }
        if(password !== password2){
            user['password2'].errors.push('Passwords is not match try again');
            user['password'].errors.push('Passwords is not match try again');
            isokey = false;
        }
        this.setState({...user});
        if(isokey){
            this.Auth.fetch(true, `${this.Auth.domain}/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    firstname:this.state.firstname.value,
                    lastname:this.state.lastname.value,
                    username:this.state.username.value,
                    password:this.state.password.value,
                    avatar:this.state.image

                })
            })
                .then(res => {
                    if (res.sucess === false) {
                        toast.error(res.err, {containerId: 'A'});
                    } else {
                        this.Auth.login(this.state.username.value,this.state.password.value)
                            .then(res =>{
                                this.props.history.replace('/');
                            })
                            .catch(err =>{
                                toast.error(err, {containerId: 'A'});
                            })
                    }
                });
        }
    };

    render() {
        return (
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
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

                    <Form.Group controlId="formControlFirstname">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="firstname"
                                placeholder="Enter your First Name"
                                aria-label="FirstName"
                                defaultValue={this.state.firstname.value}
                                onBlur={this.onInputChange}
                                // onChange={this.handleChange}
                            />
                        </InputGroup>
                        {this.state.firstname.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>


                    <Form.Group controlId="formControlLastname">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="lastname"
                                placeholder="Enter your Last Name"
                                aria-label="LastName"
                                defaultValue={this.state.lastname.value}
                                onBlur={this.onInputChange}
                                // onChange={this.handleChange}
                            />
                        </InputGroup>
                        {this.state.lastname.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="formControlUsername">
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
                                placeholder="Enter Your Username"
                                aria-label="username"
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

                    <Form.Group controlId="formControlPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPassport} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                aria-label="password"
                                defaultValue={this.state.password.value}
                                onBlur={this.onInputChange}
                            />
                        </InputGroup>
                        {this.state.password.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="formControlPassword2">
                        <Form.Label>Re-Enter a Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPassport} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="password2"
                                type="password"
                                placeholder="Verify your Password"
                                aria-label="password2"
                                defaultValue={this.state.password2.value}
                                onBlur={this.onInputChange}
                            />
                        </InputGroup>
                        {this.state.password2.errors.map((err, i) => (
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