import React, { Component } from 'react';
import validator, { field } from './validator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Form, InputGroup } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronRight, faUser, faHeading, faParagraph, faAlignCenter, faCalendarDay, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import {toast, ToastContainer} from "react-toastify";
import AuthService from "./AuthService";
library.add(faChevronRight, faUser);

class CreateEvents extends Component {
    constructor() {
        super();
        this.onInputChange = this.onInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            title:    field({value: '', name: 'title'}),
            description:  field({value: '', name: 'description'}),
            category:   field({value: '', name: 'category'}),
            date:   field({value: '', name: 'date'}),
            where:   field({value: '', name: 'where'})
        };
    }
    onInputChange({ target: { name, value } }) {
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                ...validator(value, name, this.state[name].validations)
            }
        });
    }
    handleFormSubmit(e){
        e.preventDefault();
        let isokey = true;
        const event = Object.assign({},this.state);
        for(let key in event){
            const { value, validations } = event[key];

            const { valid, errors } = validator(value, key, validations);
            // console.log(valid,errors);
            if(!valid){
                event[key].valid = valid;
                event[key].errors = errors;
                isokey = false;
            }
        }
        this.setState({...event});

        if(isokey) {
            this.Auth.fetch(true, `${this.Auth.domain}/event`, {
                method: 'POST',
                body: JSON.stringify({
                    userid:this.props.user.id,
                    description:this.state.description.value,
                    category:this.state.category.value,
                    date: new Date (this.state.date.value).toISOString(),
                    where:this.state.where.value,
                    title:this.state.title.value
                })
            })
                .then(res => {
                    if (res.sucess === false) {
                        toast.error(res.err, {containerId: 'A'});
                    } else {
                        this.props.history.push(`/event/${res.eventid}`);
                    }
                });
        }
        // console.log(this.state.username.value);
    }
    render(){
        return(
            <>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
                <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Adding a New Event</h5>
                                <form className="form-signin" onSubmit={this.handleFormSubmit}>
                                    <fieldset disabled>
                                    <Form.Group controlId="formControlUsername">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroup.Text>
                                        </InputGroup.Prepend>
                                            <Form.Control
                                                name="username"
                                                placeholder="Enter your Username"
                                                aria-label="Username"
                                                defaultValue={this.props.user.username}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    </fieldset>
                                    <Form.Group controlId="formControlTitle">
                                        <Form.Label>Title</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faHeading} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                name="title"
                                                placeholder="Enter your Event title"
                                                aria-label="title"
                                                defaultValue={this.state.title.value}
                                                onBlur={this.onInputChange}
                                                // onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        {this.state.title.errors.map((err, i) => (
                                            <Form.Text key={i} className="text-danger">
                                                {err}
                                            </Form.Text>
                                        ))}
                                    </Form.Group>
                                    <Form.Group controlId="formControlDescription">
                                        <Form.Label>Description</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faParagraph} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control as="textarea"
                                                name="description"
                                                placeholder="Enter your Event description"
                                                aria-label="description"
                                                defaultValue={this.state.description.value}
                                                onBlur={this.onInputChange}
                                                // onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        {this.state.description.errors.map((err, i) => (
                                            <Form.Text key={i} className="text-danger">
                                                {err}
                                            </Form.Text>
                                        ))}
                                    </Form.Group>
                                    <Form.Group controlId="formControlCategory">
                                        <Form.Label>Category</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faAlignCenter} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                          name="category"
                                                          placeholder="Enter your Event category"
                                                          aria-label="category"
                                                          defaultValue={this.state.category.value}
                                                          onBlur={this.onInputChange}
                                                // onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        {this.state.category.errors.map((err, i) => (
                                            <Form.Text key={i} className="text-danger">
                                                {err}
                                            </Form.Text>
                                        ))}
                                    </Form.Group>
                                    <Form.Group controlId="formControlDate">
                                        <Form.Label>Event date and time</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faCalendarDay} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                name="date"
                                                type="datetime-local"
                                                aria-label="date"
                                                defaultValue={this.state.date.value}
                                                onBlur={this.onInputChange}
                                                // onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        {this.state.date.errors.map((err, i) => (
                                            <Form.Text key={i} className="text-danger">
                                                {err}
                                            </Form.Text>
                                        ))}
                                    </Form.Group>
                                    <Form.Group controlId="formControlWhere">
                                        <Form.Label>Where ( place )</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faLocationArrow} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                name="where"
                                                placeholder="Enter your place"
                                                aria-label="where"
                                                defaultValue={this.state.where.value}
                                                onBlur={this.onInputChange}
                                                // onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        {this.state.where.errors.map((err, i) => (
                                            <Form.Text key={i} className="text-danger">
                                                {err}
                                            </Form.Text>
                                        ))}
                                    </Form.Group>
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