import React from 'react';
import {About} from './index';
import {changeData} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';


class Channel extends React.Component {
    state = {channel: '', user: ''};


    handleClick = (event) => {
        this.props.changeData(this.state.channel, 'channel');
        this.props.changeData(this.state.user, 'user');
        event.preventDefault();

    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    render() {
        return (
            <div className='login-box'>
                <h1>The Stage</h1>
                <img src={`/images/microscope-badge-200.gif`} alt='' style={{maxWidth: '225px'}}/>
                <div><input value={this.state.channel} name='channel' placeholder='Channel Name' onChange={this.handleChange}/></div>
                <div><input value={this.state.user} name='user' placeholder='User Name' onChange={this.handleChange}/></div>
                <div><input type='submit' value='Enter' onClick={this.handleClick}/></div>
                <About/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        channel: state.channel,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Channel);
