import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, Input} from 'reactstrap';

class Legacy extends Component {

    makeState = (players) => {
        let Obj = {};
        Object.keys(players).forEach(key => {
            Obj[key] = players[key].legacy
        });
        return Obj;
    };

    state = {legacy: this.makeState(this.props.players), edit: false};

    componentWillReceiveProps(nextProps) {
        this.setState({legacy: this.makeState(nextProps.players)})
    }

    handleClick = () => {
        const {players, changeData} = this.props;
        if (this.state.edit) {
            let newObj = {...players};
            Object.keys(players).forEach(key => newObj[key].legacy = this.state.legacy[key] ? this.state.legacy[key] : '');
            changeData(newObj, 'players');
        }
        this.setState({edit: !this.state.edit});
    };

    handleChange = (event) => {
        let newObj = {...this.state.legacy};
        newObj[event.target.name] = event.target.value;
        this.setState({legacy: newObj});
    };

    render() {
        const {edit, legacy} = this.state;
        const {players} = this.props;
        return (
            <Card color='info' inverse className='h-90 cardWidth'>
                <CardHeader className='font-weight-bold'>
                    Legacies
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>
                    {players &&
                    Object.keys(players).map((key) =>
                        <CardText key={key} className='py-2 border-bottom'>
                            {players[key].name}: {' '}
                            {edit ?
                                <Input onChange={this.handleChange}
                                       value={legacy[key]}
                                       name={key}
                                /> : `${players[key].legacy}`
                            }
                        </CardText>
                    )
                    }
                </CardBody>
                {players &&

                <CardFooter>
                    {edit ?
                        <Button color='secondary' size='sm' onClick={this.handleClick}>Save</Button>
                        : <Button color='secondary' size='sm' onClick={this.handleClick}>Edit</Button>
                    }
                </CardFooter>
                }
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Legacy);
