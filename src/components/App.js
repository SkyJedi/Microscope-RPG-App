import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData, loadData} from '../actions';

import {Channel} from "./index";

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
        const {channel, display, loading} = this.props;
        if (!channel) return <Channel/>;
        if (loading) return <h1>LOADING</h1>;
        else return display;
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        loading: state.loading,
        display: state.display,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData, loadData}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);