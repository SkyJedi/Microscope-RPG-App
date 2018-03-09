import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeTimeline} from '../actions';
import {Button, Card, CardBody, CardHeader, CardText} from 'reactstrap';

class Log extends Component {

    makeLog = (key) => {
        const {periods, events, scenes, logs, changeTimeline} = this.props;
        let logData = logs[key];
        let newObj = {text: `${logData.user}`, link: ''};
        switch (logData.type) {
            case 'addPeriod':
                newObj.text += ` added a Period:`;
                newObj.link = periods[logData.periodKey] && (
                    <Button color='link' name='Period' className='py-0 text-light text-left btn-wrap'
                            onClick={() => changeTimeline('Period', null, null)}>
                        {periods[logData.periodKey] ? periods[logData.periodKey].title : 'untitled'}
                    </Button>
                );
                break;
            case 'addEvent':
                newObj.text += ` added an Event:`;
                newObj.link = periods[logData.periodKey] && (
                    events[logData.periodKey] && (
                    events[logData.periodKey][logData.eventKey] && (
                        <Button color='link' name='Event' className='py-0 text-light text-left btn-wrap'
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
                        <Button color='link' name='Scene' className='py-0 text-light text-left btn-wrap'
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
                    Object.keys(logs).sort((a, b) => {
                            return b - a
                        }).map((key) =>
                        <CardText key={key} className='border-bottom py-2'>
                            {this.makeLog(key).text} {'\n'}
                                {this.makeLog(key).link}
                        </CardText>
                    )
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
