import React, { Component } from 'react';
import Event from './Event';
import {toast, ToastContainer} from "react-toastify";
import AuthService from './AuthService';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';
import Toggle from 'react-bootstrap-toggle';

class MyEventsPage extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
        this.onToggle = this.onToggle.bind(this);
        this.state = {
            events : [],
            toggleActive: false
        }
    }
    onToggle() {
        this.setState({ toggleActive: !this.state.toggleActive });
    }

    componentWillMount() {
        const userdetails = this.props.user;
        this.Auth.fetch(true, `${this.Auth.domain}/events/${userdetails.id}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.sucess === false) {
                    this.setState({
                        events: [],
                    });
                    toast.error(res.err, {containerId: 'A'});
                } else {
                    this.setState({
                        events: res.events,
                    })
                }
            })
    }

    render() {
        const {events} = this.state;
        const {user} = this.props;
        return (
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
                <div className="container bg-white rounded mt-5">
                    <div className="row py-3 border-bottom justify-content-center mb-2">
                        <h2>{user.firstname + " " + user.lastname} Event List</h2>
                    </div>
                    { events.length > 0 &&
                        <div className="row">
                            <div className="col-12">
                            <span className="float-right">
                                <Toggle
                                    className="mr-1"
                                    onClick={this.onToggle}
                                    on={"ON"}
                                    off={"OFF"}
                                    size="xs"
                                    offstyle="danger"
                                    onstyle="success"
                                    active={this.state.toggleActive}/>
                                    Edit mode
                            </span>
                            </div>
                        </div>
                    }
                    <div className="row">
                        {
                            events.length ?
                                events.map((event) => {
                                    return(
                                        <div className="col-6 my-2" key={event.id}>
                                            <Event event={event} mode="MyEventsPage" editmode={this.state.toggleActive}/>
                                        </div>
                                    )})
                                :
                                <div className="col-12 text-center">
                                    <h1>There is no Events</h1>
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default MyEventsPage;
