import React, { Component } from 'react';
import AuthService from './AuthService';
import {toast, ToastContainer} from "react-toastify";
import Event from './Event';
import AddWishModal from './AddWishModal';
import {Button} from 'react-bootstrap';

// import {Link} from "react-router-dom";


class SpecificEvent extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitbut = this.handleSubmitbut.bind(this);
        this.addwishmodalClose = this.addwishmodalClose.bind(this);
        this.Auth = new AuthService();
        this.state = {
            event: null,
            wishes: [],
            userdetails:null,
            addwishmodal:false
        };
        this.guythataddwish = {name:null,title:null,message:null,userid:null};
        this.userprofile = null;
        if(this.Auth.loggedIn()) {
            this.userprofile = this.Auth.getProfile();
            let sername = `${this.userprofile.firstname} ${this.userprofile.lastname}`;
            this.guythataddwish['userid'] = this.userprofile.id;
            this.guythataddwish['name'] = sername;
        }
    }
    handleChange(e){
        this.guythataddwish[e.target.name] = e.target.value;
    }

    handleSubmitbut = (e) => {
        e.preventDefault();
        const {eventid} = this.props.match.params;
        if(this.guythataddwish['userid'] !== null) {
            this.Auth.fetch(true, `${this.Auth.domain}/event/${eventid}`, {
                method: 'POST',
                body: JSON.stringify({
                    userid:this.guythataddwish['userid'],
                    name:this.guythataddwish['name'],
                    title:this.guythataddwish['title'],
                    message:this.guythataddwish['message']
                })
            })
                .then(res => {
                    if (res.sucess === false) {
                        toast.error(res.err, {containerId: 'A'});
                    } else {
                        console.log(res.wish);
                        this.setState({
                            wishes:[res.wish].concat(this.state.wishes),
                            addwishmodal:false
                        })

                    }
                });
        }
        else {
            this.Auth.fetch(true, `${this.Auth.domain}/event/${eventid}`, {
                method: 'POST',
                body: JSON.stringify({
                    name:this.guythataddwish['name'],
                    title:this.guythataddwish['title'],
                    message:this.guythataddwish['message']
                })
            })
                .then(res => {
                    if (res.sucess === false) {
                        toast.error(res.err, {containerId: 'A'});
                    } else {
                        this.setState({
                            wishes:[res.wish, ...this.state.wishes],
                            addwishmodal:false
                        })
                    }
                });
        }
    };
    componentWillMount() {
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
            });
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
    addwishmodalClose = () => this.setState({ addwishmodal: false });

    render() {
        const {event,wishes,userdetails} = this.state;
            return (
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
                {event !== null ?
                    <>
                    <div className="container mt-5 py-4 bg-white rounded">
                        <div className="row">
                            <div className="col-12 col-md-10 m-0 px-3">
                                <Event event={event} userdetails={userdetails} mode="SpecificEvent"/>
                            </div>
                            <div className="col text-center">
                                <Button
                                    variant="dark"
                                    className="rounded-pill mt-4"
                                    onClick={() => this.setState({ addwishmodal: true })}>
                                    Add Wish
                                </Button>
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
                                    let currdate = new Date(wish.date)
                                    return(
                                    <React.Fragment key={wish.id}>
                                            <div className="col-4 my-2">
                                                <div className="card shadow">
                                                    <kbd>{currdate.toLocaleDateString(undefined, {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })} - {wish.name}</kbd>
                                                    <div className="card-body">
                                                        <h5>{wish.title}</h5>
                                                        <small>
                                                            {wish.message}
                                                        </small>
                                                    </div>
                                                    <div className="card-footer">
                                                        <p className="card-text">
                                                            <small className="text-muted">
                                                                Posted on - {currdate.toLocaleTimeString(undefined, {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit'
                                                            })}
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
                        <AddWishModal show={this.state.addwishmodal}
                                      onHide={this.addwishmodalClose}
                                      event={event}
                                      userprofile={this.userprofile}
                                      onSubmit={this.handleSubmitbut}
                                      onChange={this.handleChange}
                        />
                    </div>
                    </>
                    :
                    <>
                        <div className="container">
                            <div className="row">
                                <div id="loader">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="lading"></div>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </>
        );
    }
}

export default SpecificEvent;