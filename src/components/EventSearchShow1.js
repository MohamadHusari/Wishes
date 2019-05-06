import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight, faGooglePlusG, faTwitter, faFacebookF, faCheck, faEnvelope);



class EventSearchShow1 extends Component {


    render() {
        return (
            <>
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
                <tr data-toggle="collapse" href="#event1" aria-expanded="false"
                    aria-controls="event1" className="collapsed">
                    <th scope="row">-1</th>
                    <td>Birthday</td>
                    <td className="d-none d-lg-table-cell">Today is my Birthday</td>
                    <td className="text-success">14/5</td>
                    <td className="text-error">Nazareth</td>
                    <td>
                        <a data-toggle="collapse" href="#event1" aria-expanded="false"
                           aria-controls="event1" className="collapsed">
                            <FontAwesomeIcon icon="chevron-right" className="d-block mx-auto"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td colSpan="6" className="p-0">
                        <div className="collapse mx-auto m-0 my-3" id="event1" role="tabpanel"
                             aria-labelledby="event1" data-parent=".table">
                            <ul className="event-list">
                                <li>
                                    <time dateTime="2014-07-20 2000">
                                        <span className="day">20</span>
                                        <span className="month">Jan</span>
                                        <span className="year">2014</span>
                                        <span className="time">8:00 PM</span>
                                    </time>
                                    <img alt="My 24th Birthday!"
                                         src="https://farm5.staticflickr.com/4150/5045502202_1d867c8a41_q.jpg"/>
                                    <div className="info">
                                        <h2 className="title">Mouse0270's 24th Birthday!</h2>
                                        <p className="desc">Bar Hopping in Erie, Pa.</p>
                                        <ul>
                                            <li>1 <FontAwesomeIcon icon="check"/></li>
                                            <li>3 <FontAwesomeIcon icon="envelope"/></li>
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
                        </div>
                    </td>
                </tr>
                {this.props.events.map((event, index) =>    <tr key={index} data-toggle="collapse" data-target="#demo3" className="accordion-toggle">
                                                                <th scope="row">{index}</th>
                                                                <td>{event.category}</td>
                                                                <td className="d-none d-lg-table-cell">{event.eventTitle}</td>
                                                                <td className="text-success">{event.when}</td>
                                                                <td className="text-error">{event.where}</td>
                                                                {/*<td className="text-success">{event.category}</td>*/}
                                                                <td>
                                                                    <a data-toggle="collapse" href="#event1" aria-expanded="false"
                                                                       aria-controls="event1" className="collapsed">
                                                                        <FontAwesomeIcon icon="chevron-right" className="d-block mx-auto"/>
                                                                    </a>
                                                                </td>
                                                            </tr>
                )}
                </tbody>
            </table>
            </>
        );
    }
}

export default EventSearchShow1;