import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import {TimeCard} from './index';
import {changeData} from "../actions";


class EventTimeline extends Component {
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
        let today = new Date();
        this.props.changeData({
            [today.getTime()]: {
                user: this.props.user,
                type: 'addEvent',
                periodKey: timeKey,
                eventKey: newKey
            }
        }, 'logs')
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
        this.props.changeData(newObject, 'events', false);
    };

    render() {
        const {events, timeKey, show} = this.props;
        const periodEvents = events ? events[timeKey] : {};
        if (!periodEvents || 0 >= Object.keys(periodEvents).length) {
            return <Button color='secondary' name={-1} onClick={this.addCard}>Add Event</Button>
        }
        return (
            <Row className='align-items-center no-gutters rowHeight'>
                {show &&
                <Col sm='3' className='h-100 mx-2 colWidth'>
                    {show}
                </Col>
                }
                {Object.keys(periodEvents).sort((a, b) => {
                    return periodEvents[a].position - periodEvents[b].position
                }).map((key, index) =>
                    <Col sm='4' className='h-100 mx-2 colWidth' key={key}>
                        <TimeCard time={periodEvents[key]} timeKey={key} superTimeKey={timeKey}/>
                        <ButtonGroup className='float-right'>
                            {index === 0 &&
                            <Button color='secondary' size='sm' className='px-1' name={-1}
                                    onClick={this.addCard}>←Add</Button>
                            }
                            <Button color='danger' size='sm' className='px-1' name={key}
                                    onClick={this.deleteCard}>Delete
                                ↑</Button>
                            <Button color='secondary' size='sm' className='px-1'
                                    name={periodEvents[key].position}
                                    onClick={this.addCard}>Add →</Button>
                        </ButtonGroup>
                    </Col>
                )}
            </Row>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        periods: state.periods,
        events: state.events,
        logs: state.logs,
        show: state.show,
        timeKey: state.timeKey,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(EventTimeline);
