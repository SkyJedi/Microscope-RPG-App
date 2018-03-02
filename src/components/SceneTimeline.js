import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Col, Row} from 'reactstrap';
import * as Components from './index';
import {changeData} from "../actions";


class SceneTimeline extends Component {

    breadCrumbs = (
        <Row className='align-items-center no-gutters py-0'>
            <Breadcrumb className='py-0 bg-white my-0'>
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' onClick={() => this.props.changeData(
                        <Components.PeriodTimeline/>, 'display')}>Periods</Button>
                </BreadcrumbItem>
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' onClick={() => this.props.changeData(
                        <Components.EventTimeline timeKey={this.props.superTimeKey}/>, 'display')}> Events</Button>
                </BreadcrumbItem>
                <BreadcrumbItem className='py-0 px-0'>
                    <Button className='py-0 px-0' color='link' disabled>Scenes</Button>
                </BreadcrumbItem>
            </Breadcrumb>
        </Row>);


    addCard = (event) => {
        const {timeKey, scenes} = this.props;
        let position = +event.target.name;
        let newKey = Math.random().toString(36).substr(2, 10);
        let newObject = {...scenes};
        if (!newObject[timeKey]) newObject[timeKey] = {};
        Object.keys(newObject[timeKey]).forEach((key) => {
            if (newObject[timeKey][key].position > position) newObject[timeKey][key].position++
        });
        newObject[timeKey][newKey] = {header: 'New Scene', position: position + 1};
        this.props.changeData(newObject, 'scenes');
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
        this.props.changeData(newObject, 'scenes');
    };

    render() {
        const {scenes, timeKey} = this.props;
        const eventScenes = scenes ? scenes[timeKey] : {};
        if (!eventScenes || 0 >= Object.keys(eventScenes).length) {
            return (
                <div>
                    {this.breadCrumbs}
                    <Button color='secondary' name={-1} onClick={this.addCard}>Add Scene</Button>
                </div>
            )
        }
        return (
            <div className='container-scroll'>
                {this.breadCrumbs}
                <Row className='align-items-center no-gutters rowHeight'>
                    {Object.keys(eventScenes).sort((a, b) => {
                        return eventScenes[a].position - eventScenes[b].position
                    }).map((key) =>
                        <Col sm='3' className='h-100 mx-2 colWidth' key={key}>
                            <Components.TimeCard time={eventScenes[key]} timeKey={key} superTimeKey={timeKey}
                                                 timeScale='Scene'/>
                            <ButtonGroup className='float-right'>
                                <Button color='danger' name={key} onClick={this.deleteCard}>Delete ↑</Button>
                                <Button color='secondary' name={eventScenes[key].position} onClick={this.addCard}>Add
                                    →</Button>
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
        scenes: state.scenes,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SceneTimeline);