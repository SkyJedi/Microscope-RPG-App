import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Input} from 'reactstrap';

class PeriodCard extends Component {
    state = {
        edit: false,
        cardType: this.props.cardType,
        cardHeader: this.props.cardHeader,
        cardTitle: this.props.cardTitle,
        cardText: this.props.cardText
    };

    handleClick = () => this.setState({edit: !this.state.edit});

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {cardType, cardHeader, cardTitle, cardText} = this.state;
        const {edit} = this.state;
        return (
            <Card className={cardType === 'dark' ? 'text-white bg-dark h-100' : 'bg-light h-100'}>
                <CardHeader>
                    {edit ?
                        <Input name='cardHeader'
                               onChange={this.handleChange}
                               placeholder={cardHeader}
                               value={cardHeader}
                        /> : cardHeader}
                </CardHeader>
                <CardBody style={{overflow: 'scroll'}}>
                    <CardTitle>
                        {edit ?
                            <Input name='cardTitle'
                                   onChange={this.handleChange}
                                   placeholder={cardTitle}
                                   value={cardTitle}
                            /> : cardTitle}
                    </CardTitle>
                    <CardText>
                        {edit ?
                            <textarea className='w-100'
                                      rows='5'
                                      name='cardText'
                                      onChange={this.handleChange}
                                      value={cardText}
                            /> : cardText}
                    </CardText>
                    {edit &&
                    <ButtonGroup className='my-1'>
                        <Button color='dark' onClick={() => this.setState({cardType: 'dark'})}>Dark</Button>
                        <Button color='light' onClick={() => this.setState({cardType: 'light'})}>Light</Button>
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PeriodCard);
