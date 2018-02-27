import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Row} from 'reactstrap';
import * as Components from './index'

class TimeLine extends Component {

    render() {
        return (
            <Row className='align-items-center no-gutters my-3' style={{height: '400px'}}>
                <Col className='h-100'>
                    <Components.PeriodCard cardType=''
                                           cardHeader='First Period'
                                           cardTitle=''
                                           cardText=''/>
                </Col>
                <Col xs='2' className='text-center'>
                    <Button color='secondary' onClick={this.modalToggle}>Add</Button>
                </Col>
                <Col className='h-100'>
                    <Components.PeriodCard cardType=''
                                           cardHeader='Last Period'
                                           cardTitle=''
                                           cardText=''/>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        user: state.user,
        periods: state.period,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TimeLine);
