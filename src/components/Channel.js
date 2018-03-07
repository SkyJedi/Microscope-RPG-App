import React from 'react';
import {About} from './index';
import {changeData} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {Button, Col, Input, Row} from 'reactstrap';


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
                <Col sm={{size: 6, offset: 3}}>
                    <Row className='justify-content-center'>
                        <h1>The Stage</h1>
                    </Row>
                    <Row className='justify-content-center my-3'>
                        <img src={`/images/microscope-badge-200.gif`} alt=''/>
                    </Row>
                    <Row className='justify-content-center my-3 '>
                        <Input value={this.state.channel} name='channel'
                               placeholder='Channel Name'
                               onChange={this.handleChange}/>
                    </Row>
                    <Row className='justify-content-center my-3'>
                        <Input value={this.state.user} name='user'
                               placeholder='User Name'
                               onChange={this.handleChange}/>
                    </Row>
                    <Row className=' justify-content-center my-3'>
                        <Button color='primary' onClick={this.handleClick}>Enter</Button>
                    </Row>
                    <About/>
                </Col>
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
