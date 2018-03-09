import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default class DeleteConfirmModal extends React.Component {
    state = {modal: this.props.deleteConfirm !== false};

    componentWillReceiveProps(nextProps) {
        this.setState({modal: nextProps.deleteConfirm !== false})
    }

    handleCancel = () => {
        this.props.handleCancel();
    };


    handleConfirm = (event) => {
        this.props.handleConfirm(event.target.value);
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.handleCancel}>
                    <ModalHeader toggle={this.handleCancel}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you would like to delete this {this.props.type}?
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' value={this.props.deleteConfirm} onClick={this.handleConfirm}>Yes,
                            DELETE</Button>{' '}
                        <Button color='secondary' onClick={this.handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

