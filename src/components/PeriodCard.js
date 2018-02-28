import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Input} from 'reactstrap';

class PeriodCard extends Component {
    state = {
        edit: false,
        type: this.props.period.type ? this.props.period.type : 'light',
        header: this.props.period.header ? this.props.period.header : '',
        title: this.props.period.title ? this.props.period.title : '',
        text: this.props.period.text ? this.props.period.text : ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.period.type ? nextProps.period.type : 'light',
            header: nextProps.period.header ? nextProps.period.header : '',
            title: nextProps.period.title ? nextProps.period.title : '',
            text: nextProps.period.text ? nextProps.period.text : ''
        });
    }

    handleClick = () => {
        const {periods, periodKey, changeData} = this.props;
        if (this.state.edit) {
            let newObject = {...periods};
            newObject[periodKey] = {
                type: this.state.type,
                header: this.state.header,
                title: this.state.title,
                text: this.state.text,
                position: this.props.period.position
            };
            changeData(newObject, 'periods');
        }
        this.setState({edit: !this.state.edit});
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {type, header, title, text} = this.state;
        const {edit} = this.state;
        return (
            <Card className={type === 'dark' ? 'text-white bg-dark h-90 cardWidth' : 'bg-light h-90 cardWidth'}>
                <CardHeader>
                    {edit ?
                        <Input name='header'
                               onChange={this.handleChange}
                               placeholder='Period Name'
                               value={header}
                        /> : header}
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>
                    <CardTitle>
                        {edit ?
                            <Input name='title'
                                   onChange={this.handleChange}
                                   placeholder={title ? title : 'Period Title'}
                                   value={title}
                            /> : title ? title : 'Period Title'}
                    </CardTitle>
                    <CardText>
                        {edit ?
                            <textarea className='w-100'
                                      rows='5'
                                      name='text'
                                      onChange={this.handleChange}
                                      value={text}
                            /> : text ? text : 'Period Description'}
                    </CardText>
                    {edit &&
                    <ButtonGroup className='my-1'>
                        <Button color='dark' onClick={() => this.setState({type: 'dark'})}>Dark</Button>
                        <Button color='light' onClick={() => this.setState({type: 'light'})}>Light</Button>
                    </ButtonGroup>
                    }
                </CardBody>

                <CardFooter>
                    {edit ?
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
        periods: state.periods,
        user: state.user,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PeriodCard);
