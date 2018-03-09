import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeTimeline} from '../actions';
import {Card, CardBody, CardHeader, CardText} from 'reactstrap';

class Log extends Component {

    makeLog = (key) => {
        const {periods, events, scenes, logs, changeTimeline} = this.props;
        let logData = logs[key];
        let newObj = {text: `${logData.user}`, link: ''};
        switch (logData.type) {
            case 'addPeriod':
                newObj.text += ` added a Period:`;
                newObj.link = periods[logData.periodKey] && (
                    <a color='link' href='#' name='Period' className='py-0 text-light'
                       onClick={() => changeTimeline('Period', null, null)}>
                        {periods[logData.periodKey] ? periods[logData.periodKey].title : 'untitled'}
                    </a>
                );
                break;
            case 'addEvent':
                newObj.text += ` added an Event:`;
                newObj.link = periods[logData.periodKey] && (
                    events[logData.periodKey] && (
                    events[logData.periodKey][logData.eventKey] && (
                        <a color='link' href='#' name='Event' className='py-0 text-light'
                           onClick={() => changeTimeline('Event', logData.periodKey, logData.periodKey)}>
                            {events[logData.periodKey][logData.eventKey].title ? events[logData.periodKey][logData.eventKey].title : 'untitled'}
                        </a>
                    )));
                break;
            case 'addScene':
                newObj.text += ` added a Scene:`;
                newObj.link = periods[logData.periodKey] && (
                    events[logData.periodKey] && (
                    events[logData.periodKey][logData.eventKey] && (
                    scenes[logData.eventKey] && (
                    scenes[logData.eventKey][logData.sceneKey] && (
                        <a color='link' href='#' name='Scene' className='py-0 text-light'
                           onClick={() => changeTimeline('Scene', logData.eventKey, logData.periodKey)}>
                            {scenes[logData.eventKey][logData.sceneKey].title ? scenes[logData.eventKey][logData.sceneKey].title : 'untitled'}
                        </a>
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
