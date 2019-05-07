import React, { Component } from 'react';
import AuthService from './AuthService';
import {toast, ToastContainer} from "react-toastify";
import ErrorPage from './ErrorPage';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {Link} from "react-router-dom";


class SpecificEvent extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
        this.state = {
            event: null,
            wishes: [],
            userdetails:null
        };
        this.userprofile = null;
        if(this.Auth.loggedIn())
            this.userprofile = this.Auth.getProfile();
    }
    componentDidMount() {
        console.log(this.props);

        const {eventid} = this.props.match.params;
        this.Auth.fetch(true, `${this.Auth.domain}/event/${eventid}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.sucess === false) {
                    this.setState({
                        event: null,
                        userdetails: null
                    });
                    toast.error('The event id is not correct please try again', {containerId: 'A'});
                } else {
                    this.setState({
                        event: res.event,
                        userdetails: res.user
                    })
                }
            })
        this.Auth.fetch(true, `${this.Auth.domain}/wishes/${eventid}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.sucess === false) {
                    this.setState({
                        wishes: []
                    });
                } else {
                    this.setState({
                        wishes: res.wishes
                    })
                }
            })
    }

    render() {
        const {event,wishes,userdetails} = this.state;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
                {event !== null ?
                    <>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-11 m-0 p-0">
                                <ul className="event-list">
                                    <li>
                                        <time dateTime={event.date}>
                                            <span className="day">{event.date.split('T')[0].split('-')[2]}</span>
                                            <span className="month">{monthNames[(parseInt(event.date.split('T')[0].split('-')[1]) - 1)]}</span>
                                            <span className="year">{event.date.split('T')[0].split('-')[0]}</span>
                                            <span className="time">{event.date.split('T')[1]}</span>
                                        </time>
                                        <img alt="My 24th Birthday!"
                                             src="https://farm5.staticflickr.com/4150/5045502202_1d867c8a41_q.jpg"/>
                                        <div className="info">
                                            <h2 className="title">{event.title.length > 28 ? event.title.substr(0,28)+'...' : event.title}</h2>
                                            <p className="desc">{event.description.length > 250 ? event.description.substr(0,250)+'...' : event.description}</p>
                                            <ul style={{width : 'calc(100% - 40px)'}}>
                                                <li><small>Posted by : {userdetails.firstname + " " + userdetails.lastname} - {userdetails.username}</small></li>
                                                {/*<li style="width:33%;">103 <span className="fa fa-envelope"></span></li>*/}
                                            </ul>
                                        </div>
                                        <div className="social">
                                            <ul>
                                                <li className="facebook">
                                                    <a href="#facebook">
                                                        <FontAwesomeIcon icon={["fab","facebook-f"]}/>
                                                    </a>
                                                </li>
                                                <li className="twitter">
                                                    <a href="#twitter">
                                                        <FontAwesomeIcon icon={["fab","twitter"]}/>
                                                    </a>
                                                </li>
                                                <li className="google-plus">
                                                    <a data-toggle="modal"
                                                       data-target="#exampleModalScrollable" href="#exampleModalScrollable">
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col m-0 p-0">
                                <button type="button" className="mt-4 btn btn-dark rounded-pill"
                                        data-toggle="modal" data-target="#exampleModal">Add Wish</button>
                            </div>
                            <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-scrollable" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalScrollableTitle">{event.title.length > 28 ? event.title.substr(0,28)+'...' : event.title}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h4>Event Title:</h4>
                                            <p className="lead">
                                                {event.title}
                                            </p>
                                            <h5>Event description:</h5>
                                            <p className="lead">
                                                {event.description}
                                            </p>
                                        </div>
                                        <div className="modal-footer justify-content-center">
                                            <small>Posted by : {userdetails.firstname + " " + userdetails.lastname} - {userdetails.username}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        {
                            wishes.length ?
                                wishes.map((wish) => {
                                    return(
                                    <React.Fragment key={wish.id}>
                                            <div className="col">
                                                <div className="card shadow">
                                                    <kbd>{wish.date.split('T')[0]} - {wish.name}</kbd>
                                                    <div className="card-body">
                                                        <h5>{wish.title}</h5>
                                                        <small>
                                                            {wish.message}
                                                        </small>
                                                    </div>
                                                    <div className="card-footer">
                                                        <p className="card-text">
                                                            <small className="text-muted">
                                                                Posted on - {wish.date.split('T')[1]}
                                                            </small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                    </React.Fragment>
                                    )})
                                :
                                <div className="col-12 text-center">
                                    <h1>There is no wishes , You can add one</h1>
                                </div>
                        }
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-scrollable" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Wish to Event id : {event.id}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form name="qryform" id="qryform">
                                            { this.userprofile === null ?
                                                <>
                                                <div className="form-group">
                                                    <label>From:</label>
                                                    <input type="text" className="form-control" id="name"
                                                           placeholder="Enter Name" name="name"/>
                                                </div>
                                                </>
                                                :
                                                <>
                                                    <fieldset disabled>
                                                    <div className="form-group">
                                                        <label>From:</label>
                                                        <input  type="text" className="form-control" id="name" value={this.userprofile.firstname + " " + this.userprofile.lastname}
                                                                placeholder="Enter Name" name="name"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Username:</label>
                                                        <input type="text" className="form-control" id="username" value={this.userprofile.username}
                                                               placeholder="Enter Email" name="username"/>
                                                    </div>
                                                    </fieldset>
                                                </>
                                            }

                                            <div className="form-group">
                                                <label>Title:</label>
                                                <input type="text" className="form-control" id="title"
                                                       placeholder="Enter Title" name="title"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Message:</label>
                                                <textarea className="form-control" id="message"
                                                          placeholder="Enter your message" name="message"/>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <ErrorPage/>
                }

            </>
        );
    }
}

export default SpecificEvent;