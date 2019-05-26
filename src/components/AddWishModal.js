import React , {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
// import {field} from "./validator";

class AddWishModal extends Component{
    render() {
        const {event, userprofile} = this.props;
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
                            Add Wish to : {event.title.length > 20 ? event.title.substr(0,20)+'...' : event.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form name="addwishform" id="#addwishform" onSubmit={(e) => this.props.onSubmit(e)}>
                            { userprofile === null ?
                                <>
                                    <div className="form-group">
                                        <label>From:</label>
                                        <input type="text" className="form-control" id="name"
                                               placeholder="Enter Name" name="name" onChange={(e) => this.props.onChange(e)}/>
                                    </div>
                                </>
                                :
                                <>
                                    <fieldset disabled>
                                        <div className="form-group">
                                            <label>From:</label>
                                            <input  type="text" className="form-control" id="name" defaultValue={userprofile.firstname + " " + userprofile.lastname}
                                                    placeholder="Enter Name" name="name"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Username:</label>
                                            <input type="text" className="form-control" id="username" defaultValue={userprofile.username}
                                                   placeholder="Enter Email" name="username"/>
                                        </div>
                                    </fieldset>
                                </>
                            }

                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" id="title"
                                       placeholder="Enter Title" name="title" onChange={(e) => this.props.onChange(e)}/>
                            </div>

                            <div className="form-group">
                                <label>Wishing you:</label>
                                <textarea className="form-control" id="message"
                                          placeholder="Enter your message" name="message" onChange={(e) => this.props.onChange(e)}/>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        <Button variant="primary" type="submit" onClick={(e) => this.props.onSubmit(e)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AddWishModal;