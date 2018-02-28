import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Components from './index';
import {db} from "../firestore/db";
import {changeData} from "../actions";

class MainPage extends Component {
    state = {loading: true};

    componentWillMount() {
        const {channel} = this.props;
        let dataTypes = ['periods'];
        dataTypes.forEach((type, index) => {
            db.doc(`channel/${channel}/data/${type}/`).get()
                .then(doc => {
                    if (doc.exists) this.props.changeData(doc.data(), type);
                    if (dataTypes.length >= index + 1) this.setState({loading: false});
                });
        });

    }

    render() {
        if (this.state.loading) return <h1>LOADING</h1>;
        return (
            <Components.TimeLine/>
        );
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

export default connect(mapStateToProps, matchDispatchToProps)(MainPage);
