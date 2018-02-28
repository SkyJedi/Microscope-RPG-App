import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import * as Components from './index';
import {changeData} from "../actions";

class TimeLine extends Component {

    addPeriod = (event) => {
        let position = +event.target.name;
        let newKey = Math.random().toString(36).substr(2, 10);
        let periods = {...this.props.periods};
        Object.keys(periods).forEach((period) => {
            if (periods[period].position > position) periods[period].position++
        });
        periods[newKey] = {header: 'New Period', position: position + 1};
        this.props.changeData(periods, 'periods');
    };

    deletePeriod = (event) => {
        let periods = {...this.props.periods};
        let position = periods[event.target.name].position;
        Object.keys(periods).forEach((period) => {
            if (periods[period].position > position) periods[period].position--
        });
        delete periods[event.target.name];
        this.props.changeData(periods, 'periods');
    };

    render() {
        const {periods} = this.props;
        return (
            <Row className='align-items-center no-gutters my-3 rowHeight'>
                {Object.keys(periods).sort((a, b) => {
                    return periods[a].position - periods[b].position
                }).map((key, index) =>
                    <Col sm='3' className='h-100 mx-2 colWidth' key={key}>
                        <Components.PeriodCard period={periods[key]} periodKey={key}
                        />
                        <ButtonGroup className='float-right'>
                            {(index !== 0 && index !== Object.keys(periods).length - 1) &&
                            <Button color='danger' name={key} onClick={this.deletePeriod}>Delete ↑</Button>}
                            {index !== Object.keys(periods).length - 1 &&
                            <Button color='secondary' name={periods[key].position}
                                    onClick={this.addPeriod}>Add →</Button>}
                        </ButtonGroup>
                    </Col>
                )}
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        user: state.user,
        periods: state.periods,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TimeLine);
