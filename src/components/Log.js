import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, CardBody, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';

class Log extends Component {

    makeLog = (key) => {
        const {periods, events, scenes, logs} = this.props;
        let logData = logs[key];
        let text = `${logData.user}`;
        switch (logData.type) {
            case 'addPeriod':
                text += ` added a Period: \n${periods[logData.periodKey] && (periods[logData.periodKey].title ? periods[logData.periodKey].title : 'untitled')}`;
                break;
            case 'addEvent':
                text += ` added a Event: \n${events[logData.periodKey] && (events[logData.periodKey][logData.eventKey] && (events[logData.periodKey][logData.eventKey].title ? events[logData.periodKey][logData.eventKey].title : 'untitled'))}`;
                break;
            case 'addScene':
                text += ` added a Scene: \n${scenes[logData.eventKey] && (scenes[logData.eventKey][logData.sceneKey] && (scenes[logData.eventKey][logData.sceneKey].title ? scenes[logData.eventKey][logData.sceneKey].title : 'untitled'))}`;
                break;
            default:
                break;
        }
        return text;
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
                                {this.makeLog(key)}
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
