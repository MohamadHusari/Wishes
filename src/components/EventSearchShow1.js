import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faCheck, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight, faGooglePlusG, faTwitter, faFacebookF, faCheck, faEnvelope, faSearch);

class EventSearchShow1 extends Component {
    // constructor() {
    //     super();
    //
    // }

    // shouldComponentUpdate(nextProps) {
    //     const differentEvents = this.props.events !== nextProps.events;
    //     // const differentSucess = this.props.sucess !== nextProps.sucess;
    //     // const differentDone = this.props.done !== nextProps.done
    //     // return differentTitle || differentDone;
    //     return differentEvents;
    // }

    render() {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const {users} = this.props;
        return (
            <>
                {this.props.events.length ?
            <table className="table table-condensed table-responsive-sm table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category</th>
                    <th scope="col" className="d-none d-lg-table-cell">Event Title</th>
                    <th scope="col">When</th>
                    <th scope="col">Where</th>
                    <th scope="col">More</th>
                </tr>
                </thead>
                <tbody>
                {this.props.events.map((event, i) => {
                    const currdate = new Date(event.date);
                    return (<React.Fragment key={"eventid"+event.id}>
                        <tr data-toggle="collapse" href={"#eventid"+event.id} aria-expanded="false"
                            aria-controls={"eventid"+event.id} className="collapsed">
                            <th scope="row">{event.id}</th>
                            <td>{event.category}</td>
                            <td className="d-none d-lg-table-cell">{event.title.length > 20 ? event.title.substr(0,20)+'...' : event.title}</td>
                            <td className="text-success">{currdate.toLocaleDateString(undefined, {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</td>
                            <td className="text-error">{event.e_where}</td>
                            <td>
                                <a data-toggle="collapse" href={"#eventid"+event.id} aria-expanded="false"
                                   aria-controls={"eventid"+event.id} className="collapsed">
                                    <FontAwesomeIcon icon="chevron-right" className="d-block mx-auto"/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="p-0">
                                <div className="collapse mx-auto m-0 my-3" id={"eventid"+event.id} role="tabpanel"
                                     aria-labelledby={"eventid"+event.id} data-parent=".table">
                                    <ul className="event-list">
                                        <li>
                                            <time dateTime={event.date}>
                                                <span className="day">{(''+currdate.getDay()).length === 1 ? '0'+currdate.getDay() : currdate.getDay() }</span>
                                                <span className="month">{monthNames[currdate.getMonth() - 1]}</span>
                                                <span className="year">{currdate.getFullYear()}</span>
                                                <span className="time">{currdate.toLocaleTimeString(undefined, {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}</span>
                                            </time>
                                            <img alt="My 24th Birthday!"
                                                 src="https://farm5.staticflickr.com/4150/5045502202_1d867c8a41_q.jpg"/>
                                            <div className="info">
                                                <h2 className="title">{event.title.length > 28 ? event.title.substr(0,28)+'...' : event.title}</h2>
                                                <p className="desc">{event.description.length > 64 ? event.description.substr(0,64)+'...' : event.description}</p>
                                                <ul className="row d-flex">
                                                    <li className="col"><Link to={"/event/"+event.id}>Show Event</Link></li>
                                                    <li className="col" data-toggle="modal" data-target="#exampleModal">3 <FontAwesomeIcon icon="envelope"/></li>
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
                                                    {/*<li className="google-plus">*/}
                                                    {/*<a href="#google-plus">*/}
                                                    {/*<FontAwesomeIcon icon={["fab","google-plus-g"]}/>*/}
                                                    {/*</a>*/}
                                                    {/*</li>*/}
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="row justify-content-center">
                                        <small>Posted by : {users[i].firstname + " " + users[i].lastname} - {users[i].username} on: {currdate.toLocaleTimeString(undefined, {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })} </small>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>);
                })
                }
                </tbody>
            </table>
                :
                    <div className="row">
                        <div className="col text-center mt-5"> <FontAwesomeIcon className="d-inline-block mr-1" icon={faSearch}/> Please search events first</div>
                    </div>
                }
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EventSearchShow1;