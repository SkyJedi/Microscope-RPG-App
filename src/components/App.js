import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeData} from '../actions';
import {Channel, MainPage} from "./index";

class App extends React.Component {
    state = {loading: true};

    componentWillMount() {
        const {changeData} = this.props;

        if (window.location.pathname !== '/') {
            changeData(window.location.pathname.slice(1).toLowerCase(), 'channel');
        }
        if (this.props.channel) {
        } else {
        }
    }

    render() {
        return (
            <div className='App'>
                {this.props.channel === null ? <Channel /> : <MainPage />}
            </div>

        );
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