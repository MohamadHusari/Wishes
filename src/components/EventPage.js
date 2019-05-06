import React, { Component } from 'react';
import * as api from "./API";

import '../style/Event.css';
import SearchEvent from './SearchEvent';
import EventSearchShow1 from './EventSearchShow1';

class EventPage extends Component {
    constructor(){
        super()
        this.state = {
            events: [],
            searchingEvents: false
        }
        this.searchingEvents = this.searchingEvents.bind(this)
    }


    componentDidMount() {
        this.setState({
            events: api.getEvents()
        })
    }

    searchingEvents(e){
            if(e.target.value){
                this.setState({
                    searchingEvents: true
                })
            }
            else{
                this.setState({
                    searchingEvents: false
                })
            }
        }
    

    render() {
        return (
            <div className="container mt-3 mt-xl-4">
                <div className="row">
                    <div className="col">
                        <button type="button" className="mt-3 btn btn-dark rounded-pill float-right">My Wishes</button>
                    </div>
                </div>
                <div className="card mt-2 tab-card">
                    <div className="row">
                        <div className="col-12 col-lg-4 pr-lg-0">
                            <SearchEvent searchFunc={this.searchingEvents}/>
                        </div>
                        <div className="col-12 col-lg-8 pl-lg-0">
                            <EventSearchShow1 events={this.state.events.filter(event=> this.state.searchingEvents? event.category == 'Birthday':true)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventPage;