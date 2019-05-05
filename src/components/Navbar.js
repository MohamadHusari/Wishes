import React, { Component } from 'react';
import {NavLink, withRouter} from "react-router-dom";
import AuthService from './AuthService';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown);

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.state={
            show:false
        }
    }
    componentDidMount() {
        document.title = 'WixWishes';
        console.log(this.props);
    }

    slideShow = ()=> {
        const {show} = this.state;
        this.setState({show:!show});
    };

    shouldComponentUpdate(nextProps) {
        const differentWord = this.props.ChangeNavWord !== nextProps.ChangeNavWord;
        // const differentDone = this.props.done !== nextProps.done
        // return differentTitle || differentDone;
        return differentWord;
    }

    render() {
        // console.log(this.props.location.pathname);
        return (
                <nav className={this.props.location.pathname !== '/'? "navbar navbar-expand-lg sticky-top": "navbar navbar-expand-lg bg-transparent"}>
                    <div className="container">
                    <NavLink className="navbar-brand text-info" to="/">
                        <img src="img/logo.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                            WixWishes
                    </NavLink>
                        {/*<div id={`nav-icon3 ${this.state.show ? 'open ' : ''}`} onClick={this.slideShow}>*/}
                            {/*<span></span>*/}
                            {/*<span></span>*/}
                            {/*<span></span>*/}
                            {/*<span></span>*/}
                        {/*</div>*/}
                        <button className={`navbar-toggler${this.state.show ? '' : ' collapsed'}`} type="button" data-toggle="collapse"
                                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                                aria-expanded="false" aria-label="Toggle navigation" onClick={this.slideShow}>
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </button>

                    <div className={`d-flex flex-column flex-lg-row navbar-collapse slide justify-content-lg-between${this.state.show ? ' slideshow pt-2' : ''}`} id="navbarNav">
                        <ul className="navbar-nav order-2 order-lg-0">
                            <li className="nav-item ">
                                <NavLink className="nav-link" exact to="/" activeClassName="selected">Home<span
                                    className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/events" activeClassName="selected">Events</NavLink>
                            </li>
                            <li className="nav-item">
                                {/*<NavLink className="nav-link" to="/wishes">Wishes</NavLink>*/}
                            </li>
                            <li className="nav-item">
                                {/*<NavLink className="nav-link" to="/about" tabIndex="-1" aria-disabled="true">About</NavLink>*/}
                            </li>
                        </ul>
                        <ul className="navbar-nav order-1 order-lg-0">
                            <li className="nav-item">
                                {this.Auth.loggedIn() ?
                                    <div className="dropdown">
                                        <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                              aria-expanded="false" >
                                             <img src={this.Auth.getProfile().avatar}
                                                  className="rounded-circle" width="30" alt="profile avatar" /> {this.Auth.getProfile().username.length > 12 ? this.Auth.getProfile().username.substr(0,12) : this.Auth.getProfile().username}
                                            <FontAwesomeIcon icon="angle-down" className="ml-1"/>
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <NavLink className="dropdown-item" to="/profile">{/*console.log(this.Auth.getProfile())*/} Profile <span
                                            className="sr-only">(current)</span></NavLink>
                                        </div>
                                    </div>
                                    :
                                    this.props.ChangeNavWord ?
                                        <NavLink className="nav-link" to="/account/signup" activeClassName="selected">Sign Up<span
                                            className="sr-only">(current)</span></NavLink>
                                        :
                                        <NavLink className="nav-link" to="/account/signin" activeClassName="selected">Sign In<span
                                            className="sr-only">(current)</span></NavLink>

                                }
                            </li>
                            <li className="nav-item">
                                {/*<NavLink className="nav-link" to="/join">Join</NavLink>*/}
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
        );
    }
}

export default withRouter(Navbar);
