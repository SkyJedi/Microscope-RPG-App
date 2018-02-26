import React from 'react';
import {About} from './index';
import {changeData} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';


class Channel extends React.Component {
    state = {channel: '', user: ''};


    handleClick = (event) => {
        window.location = `/${this.state.channel}?${this.state.user}`;
        event.preventDefault();

    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        event.preventDefault();
    };

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <h1>The Stage</h1>
                </div>
                <div className='row justify-content-center my-3'>
                    <img src={`/images/microscope-badge-200.gif`} alt='' />
                </div>
                <div className='row justify-content-center my-3'>
                    <input value={this.state.channel} name='channel'
                           placeholder='Channel Name'
                           onChange={this.handleChange}/>
                </div>
                <div className='row justify-content-center my-3'>
                    <input value={this.state.user} name='user'
                           placeholder='User Name'
                           onChange={this.handleChange}/>
                </div>
                <div className='row justify-content-center my-3'>
                    <input type='submit' value='Enter'
                           onClick={this.handleClick}/>
                </div>
                <About/>
            </div>
        )
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
