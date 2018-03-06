import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, ListGroup, ListGroupItem} from 'reactstrap';

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
                    <CardText className='mb-0 font-weight-bold'>
                        Yes:
                    </CardText>
                    {edit ?
                        <textarea className='w-100'
                                  rows='5'
                                  name='yes'
                                  onChange={this.handleChange}
                                  value={yes}
                        />
                        : palette.yes ?
                            <ListGroup>
                                {palette.yes.split('\n').map(i =>
                                    <ListGroupItem className='text-dark mx-0 my-1 px-0 py-0' key={i}>
                                        {i}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                            : ``
                    }
                    <CardText className='mb-0 font-weight-bold'>
                        No:
                    </CardText>
                    {edit ?
                        <textarea className='w-100'
                                  rows='5'
                                  name='no'
                                  onChange={this.handleChange}
                                  value={no}
                        />
                        : palette.no ?
                            <ListGroup>{palette.no.split('\n').map(i =>
                                <ListGroupItem className='text-dark mx-0 my-1 px-0 py-0' key={i}>
                                    {i}
                                </ListGroupItem>)}
                            </ListGroup>
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
