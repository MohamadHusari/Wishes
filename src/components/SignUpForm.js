import React, { Component } from 'react';
import AuthService from './AuthService';
import {Link} from "react-router-dom";

class SignUpForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Auth = new AuthService();
        this.state = {
            uploading: false,
            image: 'https://res.cloudinary.com/yallablagan/image/upload/c_thumb,w_200,g_face/v1557105634/MemberDefault_l8iaju.jpg'
        }
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
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
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
                    <div className="form-group">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input type="text" id="inputfirstname" className="form-control" name="firstname"
                               placeholder="First Name" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" id="inputlastname" className="form-control" name="lastname"
                               placeholder="Last Name" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUserName">Username</label>
                        <input type="text" id="inputusername" className="form-control" name="username"
                               placeholder="Username" required autoFocus onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" name="password"
                               placeholder="Password" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputverifyPassword">Verify Password</label>
                        <input type="password" id="inptverifypassword" className="form-control" name="verifypassword"
                               placeholder="Verify Password" required onChange={this.handleChange} />
                    </div>

                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                            type="submit">Create New Account
                    </button>
                    <span className="d-block text-center mt-2">
                        Have an account
                    <Link className="d-inline-block ml-2" to="/account/signin" onClick={() => this.props.action()}>Sign In</Link>
                    </span>
                </form>
            </>
        );
    }
}

export default SignUpForm;