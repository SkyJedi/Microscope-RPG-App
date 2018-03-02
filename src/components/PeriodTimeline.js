import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Col, Row} from 'reactstrap';
import * as Components from './index';
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
        newObject[newKey] = {header: 'New Period', position: position + 1};
        this.props.changeData(newObject, 'periods');
    };

    deleteCard = (event) => {
        let newObject = {...this.props.periods};
        let position = newObject[event.target.name].position;
        Object.keys(newObject).forEach((key) => {
            if (newObject[key].position > position) newObject[key].position--
        });
        delete newObject[event.target.name];
        this.props.changeData(newObject, 'periods');
    };

    render() {
        const {periods} = this.props;
        return (
            <div className='container-scroll'>
                <Row className='align-items-center no-gutters py-0'>
                    <Breadcrumb className='py-0 bg-white my-0'>
                        <BreadcrumbItem className='py-0 px-0' active>
                            <Button className='py-0 px-0' color='link' disabled>Periods</Button>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Row>

                <Row className='align-items-center no-gutters rowHeight'>
                    {Object.keys(periods).sort((a, b) => {
                        return periods[a].position - periods[b].position
                    }).map((key, index) =>
                        <Col sm='3' className='h-100 mx-2 colWidth' key={key}>
                            <Components.TimeCard time={periods[key]} timeKey={key} superTimeKey={key} timeScale='Period'
                            />
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
            </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(PeriodTimeline);