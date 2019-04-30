import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight);

class EventSearchShow extends Component {
    render() {
        return (
            <div id="accordion" role="tablist">
                <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                        <h5 className="mb-0">
                            <a data-toggle="collapse" href="#collapseOne" aria-expanded="false"
                               aria-controls="collapseOne" className="collapsed">
                                Collapsible Group Item #1
                                <FontAwesomeIcon icon="chevron-right" className="float-right"/>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne"
                         data-parent="#accordion">
                        <div className="card-body bg-secondary">
                            <ul className="event-list">
                                <li>
                                    <time dateTime="2014-07-20">
                                        <span className="day">4</span>
                                        <span className="month">Jul</span>
                                        <span className="year">2014</span>
                                        <span className="time">ALL DAY</span>
                                    </time>
                                    <img alt="Independence Day"
                                         src="https://farm4.staticflickr.com/3100/2693171833_3545fb852c_q.jpg"/>
                                    <div className="info">
                                        <h2 className="title">Independence Day</h2>
                                        <p className="desc">United States Holiday</p>
                                    </div>
                                    <div className="social">

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false"
                               aria-controls="collapseTwo">
                                Collapsible Group Item #2
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo"
                         data-parent="#accordion">
                        <div className="card-body">
                            <div className="event-list">
                                <li>
                                    <time dateTime="2014-07-20 0000">
                                        <span className="day">8</span>
                                        <span className="month">Jul</span>
                                        <span className="year">2014</span>
                                        <span className="time">12:00 AM</span>
                                    </time>
                                    <div className="info">
                                        <h2 className="title">One Piece Unlimited World Red</h2>
                                        <p className="desc">PS Vita</p>
                                        <ul>
                                            <li style={{width: "50%"}}><a href="#website"> Website</a></li>
                                            <li style={{width: "50%"}}> $39.99</li>
                                        </ul>
                                    </div>
                                    <div className="social">
                                        <ul>

                                        </ul>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                        <h5 className="mb-0">
                            <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false"
                               aria-controls="collapseThree">
                                Collapsible Group Item #3
                            </a>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree"
                         data-parent="#accordion">
                        <div className="card-body">
                            ...............................................................................#3
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}

export default EventSearchShow;