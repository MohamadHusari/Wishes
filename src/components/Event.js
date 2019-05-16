import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import EditEventModal from './EditEventModal';
import DeleteEventModal from './DeleteEventModal';
import ShowMoreModal from './ShowMoreModal';
import AuthService from "./AuthService";

class Event extends Component {
    constructor() {
        super();
        this.EditEventModalClose = this.EditEventModalClose.bind(this);
        this.DeleteEventModalClose = this.DeleteEventModalClose.bind(this);
        this.ShowMoreModalClose = this.ShowMoreModalClose.bind(this);
        this.state = {
            EditEventModal: false,
            DeleteEventModal: false,
            clicked_event: null,
            ShowMoreModal:false
        }
    }
    EditEventModalClose = () => this.setState({ EditEventModal: false });
    DeleteEventModalClose = () => this.setState({DeleteEventModal: false});
    ShowMoreModalClose = () => this.setState({ShowMoreModal: false});

    render() {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const {event, userdetails, editmode, mode} = this.props;
        let titlength,dislength = 0;
        if(mode === "MyEventsPage") {
            titlength = 20;
            dislength = 48;
        }
        else if (mode === "SpecificEvent") {
            titlength = 38;
            dislength = 250;
        }
        const currdate = new Date(event.date);
        return (
          <>
              <ul className="event-list">
                  <li>
                      <time dateTime={event.date.substr(0,event.date.length - 8)}>
                          <span className="day">{(''+currdate.getDate()).length === 1 ? '0'+currdate.getDate() : currdate.getDate() }</span>
                          <span className="month">{monthNames[currdate.getMonth()]}</span>
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
                          <h2 className="title">{event.title.length > titlength ? event.title.substr(0,titlength)+'...' : event.title}</h2>
                          <p className="desc">{event.description.length > dislength ? event.description.substr(0,dislength)+'...' : event.description}</p>
                          <ul className="row d-flex">
                          { userdetails !== undefined &&
                              <>
                              <li className="col" style={{cursor: 'default'}}><small>Posted by : {userdetails.firstname + " " + userdetails.lastname} - {userdetails.username} on: {currdate.toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                              })}</small></li>
                              </>
                          }
                          { !editmode &&
                              <li className="col" onClick={() => this.setState({ShowMoreModal: true})}>Read More</li>
                          }
                          { mode !== "SpecificEvent" && !editmode &&
                              <li className="col"><Link to={"/event/" + event.id}>Show wishes</Link></li>
                          }
                          {editmode === true &&
                              <>
                              <li className="col" onClick={() =>
                                  this.setState({ EditEventModal: true, clicked_event:event.id })}>Edit</li>
                              <li className="col" onClick={() => this.setState({DeleteEventModal: true})}>Delete</li>
                              </>
                          }
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
                                  {/*<a data-toggle="modal"*/}
                                     {/*data-target="#exampleModalScrollable" href="#exampleModalScrollable">*/}
                                      {/*<FontAwesomeIcon icon={faPlus}/>*/}
                                  {/*</a>*/}
                              {/*</li>*/}
                          </ul>
                      </div>
                  </li>
              </ul>
              <EditEventModal show={this.state.EditEventModal}
                              onHide={this.EditEventModalClose}
                              event={event}/>
              <DeleteEventModal show={this.state.DeleteEventModal}
                                onHide={this.DeleteEventModalClose}
                                HandleDeleteButt={this.props.HandleDeleteButt}
                                />
              <ShowMoreModal show={this.state.ShowMoreModal}
                             onHide={this.ShowMoreModalClose}
                             event={event}/>
          </>
        );
    }
}

export default Event;