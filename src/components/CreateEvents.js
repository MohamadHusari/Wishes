import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight);

class CreateEvents extends Component {
    render(){
        return(
            <><div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Adding a New Event</h5>
                                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="EventCategory">Event Category</label>
                                        <input type="text" id="EventCategory" className="form-control" name="EventCategory"
                                            placeholder="Event Category" required autoFocus onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EventTitle">Event Title</label>
                                        <input type="text" id="EventTitle" className="form-control" name="EventTitle"
                                            placeholder="Event Title" required onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input type="date" id="when" className="form-control" name="when"
                                            required onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Hour</label>
                                        <input type="time" id="when" className="form-control" name="when"
                                            required onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="where">Where</label>
                                        <input type="datetime" id="when" className="form-control" name="where"
                                            placeholder="where" required onChange={this.handleChange} />
                                    </div>
                                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                                            type="submit">Add Event
                                    </button>
                                    <hr/>

                                </form>      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default CreateEvents;