import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from 'reactstrap';

class Palette extends Component {
    state = {
        edit: false,
        yes: this.props.palette ? this.props.palette.yes : '',
        no: this.props.palette ? this.props.palette.no : '',
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            yes: nextProps.palette.yes ? nextProps.palette.yes : '',
            no: nextProps.palette.no ? nextProps.palette.no : '',
        });
    }

    handleClick = () => {
        const {changeData} = this.props;
        if (this.state.edit) {
            let newObject = {
                yes: this.state.yes,
                no: this.state.no,
                show: this.props.palette.show ? this.props.palette.show : false
            };
            changeData(newObject, 'palette');
        }
        this.setState({edit: !this.state.edit});
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {yes, no, edit} = this.state;
        const {palette} = this.props;
        return (
            <Card inverse color='primary' className='h-90 cardWidth'>
                <CardHeader className='font-weight-bold'>
                    Palette
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>
                    <CardTitle className='mb-0 font-weight-bold'>
                        Yes:
                    </CardTitle>
                    {edit ?
                        <textarea className='w-100'
                                  rows='5'
                                  name='yes'
                                  onChange={this.handleChange}
                                  value={yes}
                        />
                        : palette.yes ?
                            palette.yes.split('\n').map(i =>
                                <CardText className='my-2' key={i}>
                                    •{'\t'}{i}
                                </CardText>
                            )
                            : ``
                    }
                    <hr/>
                    <CardTitle className='mb-0 font-weight-bold'>
                        No:
                    </CardTitle>
                    {edit ?
                        <textarea className='w-100'
                                  rows='5'
                                  name='no'
                                  onChange={this.handleChange}
                                  value={no}
                        />
                        : palette.no ?
                            palette.no.split('\n').map(i =>
                                <CardText className='my-2' key={i}>
                                    •{'\t'}{i}
                                </CardText>
                            )
                            : ``
                    }
                </CardBody>

                < CardFooter>
                    {
                        edit ?
                            <Button color='secondary' size='sm' onClick={this.handleClick}>Save</Button>
                            : <Button color='secondary' size='sm' onClick={this.handleClick}>Edit</Button>

                    }
                </CardFooter>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        palette: state.palette,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Palette);
