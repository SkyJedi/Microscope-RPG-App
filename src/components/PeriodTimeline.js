import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import {TimeCard} from './index';
import {changeData} from "../actions";

class PeriodTimeline extends Component {
    componentDidMount() {
        this.props.changeData(this.props.periods, 'periods')
    };

    addCard = (event) => {
        let position = +event.target.name;
        let newKey = Math.random().toString(36).substr(2, 10);
        let newObject = {...this.props.periods};
        Object.keys(newObject).forEach((key) => {
            if (newObject[key].position > position) newObject[key].position++
        });
        newObject[newKey] = {position: position + 1, author: this.props.user};
        this.props.changeData(newObject, 'periods');
        let today = new Date();
        this.props.changeData({
            [today.getTime()]: {
                user: this.props.user,
                type: 'addPeriod',
                periodKey: newKey
            }
        }, 'logs')
    };

    deleteCard = (event) => {
        let newObject = {...this.props.periods};
        let position = newObject[event.target.name].position;
        Object.keys(newObject).forEach((key) => {
            if (newObject[key].position > position) newObject[key].position--
        });
        delete newObject[event.target.name];
        this.props.changeData(newObject, 'periods', false);
    };

    render() {
        const {periods} = this.props;
        return (
            <Row className='align-items-top no-gutters h-100'>
                {this.props.show &&
                <Col sm='3' className='h-100 mx-2 colWidth'>
                    {this.props.show}
                </Col>
                }
                {Object.keys(periods).sort((a, b) => {
                    return periods[a].position - periods[b].position
                }).map((key, index) =>
                    <Col sm='3' className='h-100 mx-2 colWidth' key={key}>
                        <TimeCard time={periods[key]} timeKey={key} superTimeKey={key}/>
                        <ButtonGroup className='float-right'>
                            {(index !== 0 && index !== Object.keys(periods).length - 1) &&
                            <Button color='danger' name={key} onClick={this.deleteCard}>Delete ↑</Button>}
                            {index !== Object.keys(periods).length - 1 &&
                            <Button color='secondary' name={periods[key].position}
                                    onClick={this.addCard}>Add →</Button>}
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
        logs: state.logs,
        show: state.show,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PeriodTimeline);
