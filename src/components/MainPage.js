import React from 'react';
import {} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MainPage extends React.Component {
    state = {loading: false};


    render() {
        if (this.state.loading) return <h1>LOADING</h1>
        return (
            <h1>BOOBS</h1>
        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
