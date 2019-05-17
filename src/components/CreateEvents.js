import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMailBulk, faCity } from "@fortawesome/free-solid-svg-icons";
import * as api from './API'
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { Form, InputGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import validator, { field } from './validator';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        event: {
            category: "",
            eventTitle: "",
            when: "",
            where: ""
        },
        error: {
            category: false,
            eventTitle: false,
            when: false,
            where: false
        },
      username: field({value:'', name: 'username', minLength: 2}),
      category: field({value: '', name: 'category'}),
      title:    field({value: '', name: 'title', minLength: 10}),
      date:     field({value: '', name: 'date'}),
      where:    field({value: '', name: 'where'})
    //   { value: "", errors: [], valid: true, validations: { isRequired: true} }
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    console.log(name, value);

    //Each value should be validated each time it changes!
    //For example: username should be
    //1- required and
    //2- more than 2 characters

    //So we did required...
    //How can we do #2?
    //How can we know we need to check this value for minimum length?
    //We need to further change our state...

    this.setState({
      [name]: {
        ...this.state[name],
        value,
        ...validator(value, name, this.state[name].validations)
      }
    });
  }

  onSubmit(e) {
    console.log(this.state);
    
    

    //Send data to somewhere 
    //...
    e.preventDefault();
  }

  addEventHandler = (e) => {
    api.addEvent(this.state.event)
    e.preventDefault()

}

onUpdate = (e) => {
    if(e.target.value.length < 2){
        let newError = this.state.error
        newError[e.target.name] = true
        this.setState({
            error: newError
        })
    }
    else{
        let newError = this.state.error
        newError[e.target.name] = false
        this.setState({
            error: newError
        })
    }
    let new_event = this.state.event
    new_event[e.target.name] = e.target.value
    this.setState({
        event: new_event
    })
    console.log(this.state.event)
    e.preventDefault()

}

  render() {

    return (
            <Container>
            <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Adding a New Event</h5>
                                <form className="form-signin" onSubmit={this.handleFormSubmit}>

                                    <Form.Group controlId="formControlEmail">
                                    <Form.Label>Event Category</Form.Label>
                                    <InputGroup className="mb-3">
                                        {/* <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroup.Text>
                                        </InputGroup.Prepend> */}
                                        <Form.Control
                                        name="category"
                                        placeholder="Enter your Event Category"
                                        aria-label="Username"
                                        defaultValue={this.state.category.value}
                                        onBlur={this.onInputChange}
                                        />
                                    </InputGroup>
                                    {this.state.category.errors.map((err, i) => (
                                        <Form.Text key={i} className="text-danger">
                                        {err}
                                        </Form.Text>
                                    ))}
                                    </Form.Group>

                                    <Form.Group controlId="formControlEmail">
                                    <Form.Label>Event Title</Form.Label>
                                    <InputGroup className="mb-3">
                                        {/* <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroup.Text>
                                        </InputGroup.Prepend> */}
                                        <Form.Control
                                        name="title"
                                        placeholder="Enter your Event Title"
                                        aria-label="title"
                                        defaultValue={this.state.title.value}
                                        onBlur={this.onInputChange}
                                        />
                                    </InputGroup>
                                    {this.state.title.errors.map((err, i) => (
                                        <Form.Text key={i} className="text-danger">
                                        {err}
                                        </Form.Text>
                                    ))}
                                    </Form.Group>

                                    <Form.Group controlId="formControlEmail">
                                    <Form.Label>Date</Form.Label>
                                    <input type="date" id="date" className="form-control" name="date"
                                            defaultValue={this.state.date.value}
                                            onBlur={this.onUpdate}/>
                                    {this.state.date.errors.map((err, i) => (
                                        <Form.Text key={i} className="text-danger">
                                        {err}
                                        </Form.Text>
                                    ))}
                                    </Form.Group>

                                    <div className="form-group">
                                        <label htmlFor="date">Hour</label>
                                        <input type="time" id="when" className="form-control" name="when"
                                            required onChange={this.handleChange} onBlur={this.onUpdate}/>
                                    </div>



                                    <Form.Group controlId="formControlEmail">
                                    <Form.Label>Where</Form.Label>
                                    <InputGroup className="mb-3">
                                        {/* <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroup.Text>
                                        </InputGroup.Prepend> */}
                                        <Form.Control
                                        name="where"
                                        placeholder="where is the event ?"
                                        aria-label="where"
                                        defaultValue={this.state.where.value}
                                        onBlur={this.onInputChange}
                                        />
                                    </InputGroup>
                                    {this.state.where.errors.map((err, i) => (
                                        <Form.Text key={i} className="text-danger">
                                        {err}
                                        </Form.Text>
                                    ))}
                                    </Form.Group>




                                    <button className="btn btn-lg btn-info btn-block text-uppercase"
                                            type="submit" onClick={(e)=>this.addEventHandler(e)}>Add Event
                                    </button>
                                    <hr/>

                                </form>      
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
    );
  }
}
