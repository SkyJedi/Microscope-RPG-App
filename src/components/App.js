import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData, loadData} from '../actions';
import {Breadcrumbs, Channel, EventTimeline, Overview, PeriodTimeline, SceneTimeline, Selector} from "./index";
import {Col, Row} from 'reactstrap';

class App extends Component {

    componentWillMount() {
        if (window.location.pathname !== '/') {
            this.props.changeData(window.location.pathname.slice(1).toLowerCase(), 'channel');
        }
        if (window.location.search !== '?') {
            this.props.changeData(window.location.search.slice(1), 'user');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.channel !== this.props.channel && nextProps.channel) this.props.loadData();
    }

    render() {
        const {channel, loading, timeScale} = this.props;
        if (!channel) return <Channel/>;
        if (loading) return <h1>LOADING</h1>;
        else return (
            <div className='container-scroll rowHeight'>
                <Row className='align-items-center no-gutters py-0 overFlow'>
                    <Col className='form-inline'>
                        <Selector/>
                        <Breadcrumbs/>
                    </Col>
                    <Col className='align-self-end'>
                        <Overview/>
                    </Col>
                </Row>
                {timeScale === 'Period' && <PeriodTimeline/>}
                {timeScale === 'Event' && <EventTimeline/>}
                {timeScale === 'Scene' && <SceneTimeline/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        loading: state.loading,
        timeScale: state.timeScale,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData, loadData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);