import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Card, CardText, CardBody,
    CardTitle, Button, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class PeriodCard extends React.Component {
    state = {lightCard: 'bg-light', darkCard: 'text-white bg-dark', modal: false};

    modalToggle = () => this.setState({modal: !this.state.modal});

    render() {
        return (
            <div>
                <Row className='align-items-center no-gutters my-3'>
                    <Col>
                        <Card className={this.state.darkCard}>
                            <CardHeader>Period Card</CardHeader>
                            <CardBody>
                                <CardTitle><h5>Dark Period</h5></CardTitle>
                                <CardText>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto atque doloremque eaque eius eum excepturi, expedita facere officiis quae quam quo quos repudiandae sapiente suscipit temporibus, totam voluptatem. Odit?</p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs='2' className='text-center'>
                        <Button color='secondary' onClick={this.modalToggle}>Add</Button>
                    </Col>
                    <Col>
                        <Card className={this.state.lightCard}>
                            <CardHeader>Period Card</CardHeader>
                            <CardBody>
                                <CardTitle><h5>Light Period</h5></CardTitle>
                                <CardText>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto atque doloremque eaque eius eum excepturi, expedita facere officiis quae quam quo quos repudiandae sapiente suscipit temporibus, totam voluptatem. Odit?</p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                    <ModalHeader toggle={this.modalToggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        periods: state.periods,
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PeriodCard);
