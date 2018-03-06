import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import * as Components from './index';
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, Input} from 'reactstrap';

class TimeCard extends Component {
    state = {
        edit: false,
        type: this.props.time.type ? this.props.time.type : 'light',
        header: this.props.time.header ? this.props.time.header : '',
        title: this.props.time.title ? this.props.time.title : '',
        text: this.props.time.text ? this.props.time.text : ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.time.type ? nextProps.time.type : 'light',
            header: nextProps.time.header ? nextProps.time.header : '',
            title: nextProps.time.title ? nextProps.time.title : '',
            text: nextProps.time.text ? nextProps.time.text : ''
        });
    }

    handleClick = () => {
        const {periods, events, scenes, timeKey, superTimeKey, changeData, timeScale} = this.props;
        if (this.state.edit) {
            let newObject = {};
            let type = '';
            if (timeScale === 'Period') {
                type = 'periods';
                newObject = {...periods};
            }
            else if (timeScale === 'Event') {
                type = 'events';
                newObject = {...events};
                Object.keys(events).forEach((key) => newObject[key] = {...events[key]})
            }
            else if (timeScale === 'Scene') {
                type = 'scenes';
                newObject = {...scenes};
                Object.keys(scenes).forEach((key) => newObject[key] = {...scenes[key]})

            }
            if (timeScale === 'Period') {
                newObject[timeKey] = {
                    type: this.state.type,
                    header: this.state.header,
                    title: this.state.title,
                    text: this.state.text,
                    author: this.props.time.author ? this.props.time.author : this.props.user,
                    position: this.props.time.position
                };
            } else {
                if (!newObject[superTimeKey][timeKey]) newObject[superTimeKey][timeKey] = {};
                newObject[superTimeKey][timeKey] = {
                    type: this.state.type,
                    header: this.state.header,
                    title: this.state.title,
                    text: this.state.text.replace(/\r?\n/g, '<br />'),
                    author: this.props.time.author ? this.props.time.author : this.props.user,
                    position: this.props.time.position
                };
            }
            changeData(newObject, type);
        }
        this.setState({edit: !this.state.edit});
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleTimeline = () => {
        let type;
        type = this.props.timeScale === 'Period' ?
            <Components.EventTimeline timeKey={this.props.timeKey} superTimeKey={this.props.superTimeKey}/> :
            <Components.SceneTimeline timeKey={this.props.timeKey} superTimeKey={this.props.superTimeKey}/>;
        this.props.changeData(type, 'display');
    };

    subCount = () => {
        const {timeScale, timeKey, events, scenes} = this.props;
        let text = '';
        if (timeScale === 'Period') {
            if (events) {
                if (events[timeKey]) text += `${Object.keys(events[timeKey]).length} ${Object.keys(events[timeKey]).length === 1 ? 'Event' : 'Events'}`;
                else text += '0 Events';
            }
            else text += '0 Events';
        }
        else {
            if (scenes) {
                if (scenes[timeKey]) text += `${Object.keys(scenes[timeKey]).length} ${Object.keys(scenes[timeKey]).length === 1 ? 'Scene' : 'Scenes'}`;
                else text += '0 Scenes';
            }
            else text += '0 Scenes';
        }
        return text
    };

    render() {
        const {type, header, title, text, edit} = this.state;
        const {timeScale,} = this.props;
        return (
            <Card className={type === 'dark' ? 'text-white bg-dark h-90 cardWidth' : 'bg-light h-90 cardWidth'}>
                <CardHeader>
                    <div className='font-weight-bold'>
                        {edit ?
                            <Input name='title'
                                   onChange={this.handleChange}
                                   placeholder={title ? title : `${timeScale} Title`}
                                   value={title}
                            /> : title ? title : `${timeScale} Title`}
                    </div>
                    <div className='text-center my-1'>{header ? header : ``}</div>

                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>
                    <CardText style={{whiteSpace: 'pre-line'}}>
                        {edit ?
                            <textarea className='w-100'
                                      rows='5'
                                      name='text'
                                      onChange={this.handleChange}
                                      value={text}
                            /> : text ? text : `${timeScale} Description`
                        }
                    </CardText>

                    {edit &&
                    <ButtonGroup className='my-1'>
                        <Button color='dark' onClick={() => this.setState({type: 'dark'})}>Dark</Button>
                        <Button color='light' onClick={() => this.setState({type: 'light'})}>Light</Button>
                    </ButtonGroup>
                    }
                </CardBody>
                <CardFooter className='font-italic'>
                    {this.props.time.author && `-${this.props.time.author}`}
                </CardFooter>
                <CardFooter>
                    {edit ?
                        <Button color='secondary' size='sm' onClick={this.handleClick}>Save</Button>
                        : <Button color='secondary' size='sm' onClick={this.handleClick}>Edit</Button>

                    }
                    {!(timeScale === 'Scene') && <Button color='secondary' size='sm' className='float-right'
                                                         onClick={this.handleTimeline}>{this.subCount()}</Button>}
                </CardFooter>
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
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TimeCard);
