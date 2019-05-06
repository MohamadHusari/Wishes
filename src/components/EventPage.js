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
            searchingEvents: {},
            eventId: false,
            category: false,
            eventTitle: false,
            when: false,
            where: false
        }
        this.searchingEvents = this.searchingEvents.bind(this)
    }


    componentDidMount() {
        this.setState({
            events: api.getEvents()
        })
    }

    searchingEvents(e){
        console.log(e.target.id)
            if(e.target.value){
                this.setState({
                    [e.target.id]: e.target.value
                })
            }
            else{
                this.setState({
                    [e.target.id]: false
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
                            <EventSearchShow1 events={this.state.events.filter(
                                event => this.state.eventId ||  this.state.category || this.state.eventTitle || this.state.when || this.state.where ?
                                this.state.category ? event.category.includes(this.state.category): true && 
                                this.state.eventTitle ? event.eventTitle.includes(this.state.eventTitle): true &&
                                this.state.when ? event.when.includes(this.state.when): true &&
                                this.state.where ? event.where.includes(this.state.where): true:
                            true)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventPage;