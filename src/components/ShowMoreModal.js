import React , {Component} from 'react';
import {Button, Modal} from "react-bootstrap";


class ShowMoreModal extends Component {
    render() {
        const {event} = this.props;
        const currdate = new Date(event.date);
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
                            {event.title.length > 28 ? event.title.substr(0,28)+'...' : event.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Event Title:</h4>
                        <p className="lead">
                            {event.title}
                        </p>
                        <h5>Event description:</h5>
                        <p className="lead">
                            {event.description}
                        </p>
                        <h5>Catagory:</h5>
                        <p className="lead">
                            {event.category}
                        </p>
                        <h5>Where:</h5>
                        <p className="lead">
                            {event.e_where}
                        </p>
                        <h5>Date:</h5>
                        <p className="lead">
                            {currdate.toISOString()}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ShowMoreModal;