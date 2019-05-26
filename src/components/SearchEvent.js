import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);

class SearchEvent extends Component {
    render() {
        return (
            <>
                <h4 className="card-title text-uppercase font-weight-normal mb-3 pt-3 ml-2"><FontAwesomeIcon icon="search"/> Search Event</h4>
                <div className="card-header tab-card-header">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab"
                               aria-controls="One" aria-selected="true">By Event ID</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab"
                               aria-controls="Two" aria-selected="false">Advanced search</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active p-3" id="one" role="tabpanel"
                         aria-labelledby="one-tab">
                        {/*<h5 className="card-title">Tab Card One</h5>*/}
                        {/*<p className="card-text">Some quick example text to build on the card title and make*/}
                            {/*up the bulk of the card's content.</p>*/}
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                        <div className="form-group">
                            <input type="intNumber" id="eventId" className="form-control" name="eventid"
                                   placeholder="Event ID" required autoFocus onChange={(e)=>this.props.inputChange(e)} />
                        </div>
                        <div className="row justify-content-center">
                            <button className="btn btn-danger" onClick={()=>this.props.searchFunc()}><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </div>
                    <div className="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
                        <div className="form-group">
                            <input type="text" id="eventtitle" className="form-control" name="eventtitle"
                                   placeholder="Event Title" required autoFocus onChange={(e)=>this.props.inputChange(e)} />
                        </div>
                        <div className="form-group">
                            <span className="d-block text-center">From :</span>
                            <input type="date" id="fromdate" className="form-control" name="fromdate"
                                   autoFocus onChange={(e)=>this.props.inputChange(e)} />
                        </div>
                        <div className="form-group">
                            <span className="d-block text-center">To :</span>
                            <input type="date" id="todate" className="form-control" name="todate"
                                   autoFocus onChange={(e)=>this.props.inputChange(e)} />
                        </div>
                        <div className="form-group">
                            <input type="text" id="eventwhere" className="form-control" name="eventwhere"
                                   placeholder="Where place" autoFocus onChange={(e)=>this.props.inputChange(e)} />
                        </div>
                        <div className="row justify-content-center">
                            <button className="btn btn-danger" onClick={()=>this.props.advSearch()}><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </div>
                </div>
        </>
    );
    }
}


export default SearchEvent;