import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight);

class AddWish extends Component {
    render(){
        return(
            <><div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Adding a Best Wish</h5>
                                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="EventCategory" className="form-control" name="name"
                                            placeholder="Your Name" required autoFocus onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EventTitle">Wish Message</label>
                                        <input type="wish_msg" id="EventTitle" className="form-control" name="EventTitle"
                                            placeholder="Insert Your Wish Message" required onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EventTitle">Select a Photo</label>
                                        <input type="file" accept="image/*" name="file" onChange={this.onChange}/>
                                    </div>
                                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                                            type="submit">Add A Wish
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

export default AddWish;