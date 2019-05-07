import React, { Component } from 'react';
import '../style/Header.css';
import Navbar from './Navbar'
import { Link } from "react-router-dom";

class Header extends Component {
    // componentDidMount() {
    //     console.log(this.props);
    // }
    // componentDidMount() {
    //     window.addEventListener('resize', () => {
    //         // We execute the same script as before
    //         let vh = window.outerHeight * 0.01;
    //         document.documentElement.style.setProperty('--vh', `${vh}px`);
    //     });
    // }

    render() {
        return (
                <section>
                    <div className="custom-bg" >
                        <div className="header-overlay">
                            <Navbar/>
                            <div className="header-content">
                                <div className="container">
                                    <div className="col-12">
                                        <div className="text-center text-white text-uppercase">
                                            <h1 className="display-4"> Welcome To events Site</h1>
                                            <p className="h1 font-weight-light"> Built with great love!</p>
                                        </div>
                                    </div>

                                    <div className="col-12 index-btns-col clearfix">
                                        <Link className="btn btn-lg btn-outline-info text-white font-weight-light mr-2 mr-md-0" to="/event/add">
                                            Create New Event Box</Link>

                                        <Link className="btn btn-lg btn-outline-info text-white font-weight-light float-md-right" to="#">
                                            Add a Best Wish</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            );
    }
}

export default Header;