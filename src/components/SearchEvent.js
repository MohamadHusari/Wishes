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
                               aria-controls="Two" aria-selected="false">Advantage search</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active p-3" id="one" role="tabpanel"
                         aria-labelledby="one-tab">
                        {/* <h5 className="card-title">Insert Event ID</h5> */}
                        {/* <p className="card-text">Some quick example text to build on the card title and make
                            up the bulk of the card's content.</p> */}
                        <div className="form-group">
                            <input type="text" id="eventId" className="form-control" name="eventId"
                                placeholder="Event ID" required autoFocus onChange={(e)=>this.props.searchFunc(e)} />
                        </div>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
                    <div className="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
                        {/* <h5 className="card-title">Tab Card Two</h5>
                        <p className="card-text">Some quick example text to build on the card title and make
                            up the bulk of the card's content.</p> */}
                        <div className="form-group">
                            <input type="text" id="category" className="form-control mb-3" name="category"
                                placeholder="Category" required autoFocus onChange={(e)=>this.props.searchFunc(e)} />
                        <input type="text" id="eventTitle" className="form-control mb-3" name="eventTitle"
                                placeholder="Event Title" required autoFocus onChange={(e)=>this.props.searchFunc(e)} />
                        <input type="text" id="when" className="form-control mb-3" name="when"
                                placeholder="When" required autoFocus onChange={(e)=>this.props.searchFunc(e)} />
                        <input type="text" id="where" className="form-control mb-3" name="where"
                                placeholder="Where" required autoFocus onChange={(e)=>this.props.searchFunc(e)} />
                        </div>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
                </div>
        </>
    );
    }
}


export default SearchEvent;