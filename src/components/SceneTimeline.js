import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import {TimeCard} from './index';
import {changeData} from "../actions";


class SceneTimeline extends Component {

    addCard = (event) => {
        const {timeKey, scenes, superTimeKey} = this.props;
        let position = +event.target.name;
        let newKey = Math.random().toString(36).substr(2, 10);
        let newObject = {...scenes};
        if (!newObject[timeKey]) newObject[timeKey] = {};
        Object.keys(newObject[timeKey]).forEach((key) => {
            if (newObject[timeKey][key].position > position) newObject[timeKey][key].position++
        });
        newObject[timeKey][newKey] = {position: position + 1, author: this.props.user};
        this.props.changeData(newObject, 'scenes');
        let today = new Date();
        this.props.changeData({
            [today.getTime()]: {
                user: this.props.user,
                type: 'addScene',
                sceneKey: newKey,
                eventKey: timeKey,
                periodKey: superTimeKey
            }
        }, 'logs')
    };

    deleteCard = (event) => {
        const {timeKey, scenes} = this.props;
        let newObject = {...scenes};
        let position = newObject[timeKey][event.target.name].position;
        Object.keys(newObject[timeKey]).forEach((key) => {
            if (newObject[timeKey][key].position > position) newObject[timeKey][key].position--
        });
        if (1 >= Object.keys(newObject[timeKey]).length) newObject[timeKey] = '';
        else delete newObject[timeKey][event.target.name];
        this.props.changeData(newObject, 'scenes', false);
    };

    render() {
        const {scenes, timeKey, show} = this.props;
        const eventScenes = scenes ? scenes[timeKey] : {};
        if (!eventScenes || 0 >= Object.keys(eventScenes).length) {
            return <Button color='secondary' name={-1} onClick={this.addCard}>Add Scene</Button>
        }

        return (
            <Row className='align-items-center no-gutters rowHeight'>
                {show &&
                <Col sm='3' className='h-100 mx-2 colWidth'>
                    {show}
                </Col>
                }
                {Object.keys(eventScenes).sort((a, b) => {
                    return eventScenes[a].position - eventScenes[b].position
                }).map((key, index) =>
                    <Col sm='3' className='h-100 mx-2 colWidth' key={key}>
                        <TimeCard time={eventScenes[key]} timeKey={key} superTimeKey={timeKey}/>
                        <ButtonGroup className='float-right'>
                            {index === 0 &&
                            <Button color='secondary' size='sm' className='px-1' name={-1}
                                    onClick={this.addCard}>←Add</Button>
                            }
                            <Button color='danger' size='sm' className='px-1' name={key} onClick={this.deleteCard}>Delete
                                ↑</Button>
                            <Button color='secondary' size='sm' className='px-1' name={eventScenes[key].position}
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
        periods: state.periods,
        events: state.events,
        scenes: state.scenes,
        user: state.user,
        logs: state.logs,
        show: state.show,
        timeKey: state.timeKey,
        superTimeKey: state.superTimeKey,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SceneTimeline);
