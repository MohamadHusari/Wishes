import React , {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class EditEventModal extends Component {
    render() {
        const {event} = this.props;
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
                                <input type="date" id="dateevent" className="form-control" name="dateevent"/>
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