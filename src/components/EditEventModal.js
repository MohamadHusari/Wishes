import React , {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {field} from "./validator";
import validator from "./validator";

class EditEventModal extends Component {
    constructor () {
        super();
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
    render() {
        const {event} = this.props;
        // const currdate = new Date(event.date);
        // const currentDate = currdate.toLocaleDateString(undefined, {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric'
        // });
        // const currentTime = currdate.getHours() + ':' + currdate.getMinutes();
        return (
            <>
                <Modal
                    {...this.props}
                    // size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Event id : {event.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form name="addwishform" id="#addwishform">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" id="titleevent"
                                       placeholder="Enter Title" name="title" defaultValue={event.title}/>
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea className="form-control" id="descriptionevent"
                                          placeholder="Enter your message" name="description"
                                          defaultValue={event.description}/>
                            </div>
                            <div className="form-group">
                                <label>Catagory:</label>
                                <input type="text" className="form-control" id="catagoryevent"
                                       placeholder="Enter Catagory" name="catagoryevent" defaultValue={event.category}/>
                            </div>
                            <div className="form-group">
                                <label>Where:</label>
                                <input type="text" className="form-control" id="whereevent"
                                       placeholder="Enter Where" name="whereevent" defaultValue={event.e_where}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateevent">Date</label>
                                <input type="datetime-local" id="dateevent" className="form-control" name="dateevent" defaultValue={event.date.substr(0,event.date.length - 8)}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default EditEventModal;