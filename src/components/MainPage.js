import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Component from './index';
import {Container} from 'reactstrap';

class MainPage extends React.Component {
    state = {loading: false};


    render() {
        if (this.state.loading) return <h1>LOADING</h1>;
        return (
            <Container>
                <Component.TimeLine/>
            </Container>
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
