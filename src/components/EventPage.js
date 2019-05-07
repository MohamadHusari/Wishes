import React, { Component } from 'react';
import '../style/Event.css';
import SearchEvent from './SearchEvent';
import EventSearchShow1 from './EventSearchShow1';
import {ToastContainer, toast } from 'react-toastify';
import AuthService from './AuthService';

import 'react-toastify/dist/ReactToastify.css';

class EventPage extends Component {
    constructor() {
        super();
        this.handleSearchbut = this.handleSearchbut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.state = {
            eventid : '',
            events : [],
            usersdetails:[]
        }
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }
    // componentDidMount() {
    //     console.log(this.props);
    // }
    handleSearchbut = () => {
        if(this.state.eventid !== ''){
            if(parseInt(this.state.eventid)) {
                this.Auth.fetch(true, `${this.Auth.domain}/event/${this.state.eventid}`, {
                    method: 'GET',
                })
                    .then(res => {
                        if (res.sucess === false) {
                            this.setState({
                                events: [],
                                usersdetails: []
                            });
                            toast.error(res.err, {containerId: 'A'});
                        } else {
                            this.setState({
                                events: [res.event],
                                usersdetails: [res.user]
                            })
                        }
                    })
            }
            else {
                toast.error('Input just an number please', {containerId: 'A'});
            }
        }
        else
        {
            this.setState({
                events: [],
            });
            toast.error('Empty input', {containerId: 'A'});
        }
    };
    render() {
        return (
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
                <div className="container mt-3 mt-xl-4">
                    <div className="row">
                        <div className="col">
                            <button type="button" className="mt-3 btn btn-dark rounded-pill float-right">My Wishes</button>
                        </div>
                    </div>
                    <div className="card mt-2 tab-card">
                        <div className="row">
                            <div className="col-12 col-lg-4 pr-lg-0">
                                <SearchEvent searchFunc={this.handleSearchbut} inputChange={this.handleChange}/>
                            </div>
                            <div className="col-12 col-lg-8 pl-lg-0">
                                <EventSearchShow1 events={this.state.events} users={this.state.usersdetails}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EventPage;