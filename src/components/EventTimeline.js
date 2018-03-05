import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Col, Row} from 'reactstrap';
import * as Components from './index';
import {changeData} from "../actions";


class EventTimeline extends Component {
    state = {show: false};

    breadCrumbs = (
        <Row className='align-items-center no-gutters py-0'>
            <Col className='form-inline'>
                <Button className='py-0 px-0' onClick={() => this.setState({show: !this.state.show})} color='link'>Show
                    Palette
                </Button>
                <Breadcrumb className='py-0 bg-white my-0'>
                    <BreadcrumbItem className='py-0 px-0'>
                        <Button className='py-0 px-0' color='link' onClick={() => this.props.changeData(
                            <Components.PeriodTimeline/>, 'display')}>Overview</Button>
                    </BreadcrumbItem>
                    <BreadcrumbItem className='py-0 px-0'>
                        <Button className='py-0 px-0' color='link'
                                disabled>Period: {this.props.periods[this.props.timeKey].title}</Button>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Col>
            <Col className='align-self-end'>
                <Components.Overview/>
            </Col>
        </Row>);


    addCard = (event) => {
        const {timeKey, events} = this.props;
        let position = +event.target.name;
        let newKey = Math.random().toString(36).substr(2, 10);
        let newObject = {...events};
        if (!newObject[timeKey]) newObject[timeKey] = {};
        Object.keys(newObject[timeKey]).forEach((key) => {
            if (newObject[timeKey][key].position > position) newObject[timeKey][key].position++
        });
        newObject[timeKey][newKey] = {position: position + 1, author: this.props.user};
        this.props.changeData(newObject, 'events');
    };

    deleteCard = (event) => {
        const {timeKey, events} = this.props;
        let newObject = {...events};
        let position = newObject[timeKey][event.target.name].position;
        Object.keys(newObject[timeKey]).forEach((key) => {
            if (newObject[timeKey][key].position > position) newObject[timeKey][key].position--
        });
        if (1 >= Object.keys(newObject[timeKey]).length) newObject[timeKey] = '';
        else delete newObject[timeKey][event.target.name];
        this.props.changeData(newObject, 'events');
    };

    render() {
        const {events, timeKey} = this.props;
        const periodEvents = events ? events[timeKey] : {};
        if (!periodEvents || 0 >= Object.keys(periodEvents).length) {
            return (
                <div>
                    {this.breadCrumbs}
                    <Button color='secondary' name={-1} onClick={this.addCard}>Add Event</Button>
                </div>
            )
        }
        return (
            <div className='container-scroll'>
                {this.breadCrumbs}
                <Row className='align-items-center no-gutters rowHeight'>
                    {this.state.show &&
                    <Col sm='3' className='h-100 mx-2 colWidth'>
                        <Components.Palette/>
                    </Col>}
                    {Object.keys(periodEvents).sort((a, b) => {
                        return periodEvents[a].position - periodEvents[b].position
                    }).map((key, index) =>
                        <Col sm='4' className='h-100 mx-2 colWidth' key={key}>
                            <Components.TimeCard time={periodEvents[key]} timeKey={key} superTimeKey={timeKey}
                                                 timeScale='Event'/>
                            <ButtonGroup className='float-right'>
                                {index === 0 &&
                                <Button color='secondary' size='sm' className='px-1' name={-1}
                                        onClick={this.addCard}>←Add</Button>
                                }
                                <Button color='danger' size='sm' className='px-1' name={key} onClick={this.deleteCard}>Delete
                                    ↑</Button>
                                <Button color='secondary' size='sm' className='px-1' name={periodEvents[key].position}
                                        onClick={this.addCard}>Add →</Button>
                            </ButtonGroup>
                        </Col>
                    )}
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        periods: state.periods,
        events: state.events,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EventTimeline);
