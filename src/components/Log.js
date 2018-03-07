import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeTimeline} from '../actions';
import {Button, Card, CardBody, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';

class Log extends Component {

    makeLog = (key) => {
        const {periods, events, scenes, logs, changeTimeline} = this.props;
        let logData = logs[key];
        let newObj = {text: `${logData.user}`, link: ''};
        switch (logData.type) {
            case 'addPeriod':
                newObj.text += ` added a Period:`;
                newObj.link = periods[logData.periodKey] && (
                    <Button color='link' name='Period' onClick={() => changeTimeline('Period', null, null)}>
                        {periods[logData.periodKey] ? periods[logData.periodKey].title : 'untitled'}
                    </Button>
                );
                break;
            case 'addEvent':
                newObj.text += ` added a Event:`;
                newObj.link = periods[logData.periodKey] && (
                    events[logData.periodKey] && (
                    events[logData.periodKey][logData.eventKey] && (
                        <Button color='link' name='Event'
                                onClick={() => changeTimeline('Event', logData.periodKey, logData.periodKey)}>
                            {events[logData.periodKey][logData.eventKey].title ? events[logData.periodKey][logData.eventKey].title : 'untitled'}
                        </Button>
                    )));
                break;
            case 'addScene':
                newObj.text += ` added a Scene:`;
                newObj.link = periods[logData.periodKey] && (
                    events[logData.periodKey] && (
                    events[logData.periodKey][logData.eventKey] && (
                    scenes[logData.eventKey] && (
                    scenes[logData.eventKey][logData.sceneKey] && (
                        <Button color='link' name='Event'
                                onClick={() => changeTimeline('Scene', logData.eventKey, logData.periodKey)}>
                            {scenes[logData.eventKey][logData.sceneKey].title ? scenes[logData.eventKey][logData.sceneKey].title : 'untitled'}
                        </Button>
                    )))));
                break;
            default:
                break;
        }
        return newObj;
    };

    render() {
        const {logs} = this.props;
        return (
            <Card inverse color='success' className='h-90 cardWidth'>
                <CardHeader className='font-weight-bold'>
                    Logs
                </CardHeader>
                <CardBody style={{overflowY: 'scroll', whiteSpace: 'pre-line'}}>
                    {logs &&
                    <ListGroup>
                        {Object.keys(logs).sort((a, b) => {
                            return b - a
                        }).map((key) =>
                            <ListGroupItem key={key} className='text-dark mx-0 my-1 px-0 py-0'>
                                {this.makeLog(key).text}
                                {this.makeLog(key).link}
                            </ListGroupItem>
                        )}
                    </ListGroup>
                    }
                </CardBody>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        periods: state.periods,
        events: state.events,
        scenes: state.scenes,
        user: state.user,
        logs: state.logs,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeTimeline}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
