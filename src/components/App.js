import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Channel, MainPage} from "./index";

class App extends React.Component {

    componentWillMount() {
        if (window.location.pathname !== '/') {
            this.props.changeData(window.location.pathname.slice(1).toLowerCase(), 'channel');
        }
        if (window.location.search !== '?') {
            this.props.changeData(window.location.search.slice(1), 'user');
        }
    }

    render() {
        return (
            <div>
                {this.props.channel === null ? <Channel /> : <MainPage />}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({changeData}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);