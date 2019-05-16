import React , {Component} from 'react';
import {Button, Modal} from "react-bootstrap";


class DeleteEventModal extends Component {
    render() {
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
                            Confirm Delete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you Sure ?, You will not be able to recover this event!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        <Button variant="danger" type="submit" onClick={() => {
                            this.props.HandleDeleteButt();
                            this.props.onHide();
                        }}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteEventModal;