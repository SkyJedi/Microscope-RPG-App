import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Input} from 'reactstrap';

class Overview extends Component {
    state = {
        edit: false,
        text: this.props.overview ? this.props.overview.text : ''
    };

    componentWillReceiveProps(nextProps) {
        if (!this.state.edit) this.setState({text: nextProps.overview.text});
    }

    handleChange = (event) => {
        this.setState({text: event.target.value})
    };


    handleClick = () => {
        const {text} = this.state;
        if (this.state.edit) this.props.changeData({text}, 'overview');
        this.setState({edit: !this.state.edit})
    };

    render() {
        const {text, edit} = this.state;
        const {overview} = this.props;
        return (
            <form className='form-inline float-right'>
                <b>Overview:&nbsp;</b>
                {edit ?
                    <Input name='title'
                           onChange={this.handleChange}
                           placeholder={overview ? overview.text : 'The big picture'}
                           value={text}
                    /> : overview ? overview.text : 'The big picture'
                }

                {edit ?
                    <Button color='secondary' className='mx-2' size='sm' onClick={this.handleClick}>Save</Button>
                    : <Button color='secondary' className='mx-2' size='sm' onClick={this.handleClick}>Edit</Button>

                }
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        overview: state.overview,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Overview);
