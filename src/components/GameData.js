import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Input} from 'reactstrap';

class GameData extends Component {

    makeState = (players) => {
        let Obj = {};
        Object.keys(players).forEach(key => {
            Obj[key] = players[key].legacy
        });
        return Obj;
    };

    state = {
        legacy: this.makeState(this.props.players),
        edit: false,
        focus: this.props.gameData ? this.props.gameData.focus : '',
        oldLegacy: this.props.gameData ? this.props.gameData.oldLegacy : '',
    };
    handleClick = () => {
        const {players, changeData} = this.props;
        const {edit, legacy, oldLegacy, focus} = this.state;
        if (edit) {
            let Obj1 = {...players};
            Object.keys(players).forEach(key => Obj1[key].legacy = legacy[key] ? legacy[key] : '');
            changeData(Obj1, 'players');
            changeData({oldLegacy, focus}, 'gameData');
        }
        this.setState({edit: !this.state.edit});
    };
    handleLegacyChange = (event) => {
        let newObj = {...this.state.legacy};
        newObj[event.target.name] = event.target.value;
        this.setState({legacy: newObj});
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            legacy: this.makeState(nextProps.players),
            focus: nextProps.gameData ? nextProps.gameData.focus : '',
            oldLegacy: nextProps.gameData ? nextProps.gameData.oldLegacy : '',
        })
    }

    render() {
        const {edit, legacy, focus, oldLegacy} = this.state;
        const {players, gameData} = this.props;
        return (
            <Card color='info' inverse className='h-90 cardWidth'>
                <CardHeader className='font-weight-bold'>
                    Game Data
                </CardHeader>

                <CardBody style={{overflowY: 'scroll'}}>
                    <CardTitle className='my-1'>
                        Focus:
                    </CardTitle>
                    <CardText name='focus' className='py-1 my-0'>
                        {edit ?
                            <Input onChange={this.handleChange}
                                   value={focus}
                                   name='focus'
                            /> : gameData ? `•\t${gameData.focus}` : ''
                        }
                    </CardText>
                    <hr className='my-3'/>
                    <CardTitle className='my-1'>
                        Current Legacy:
                    </CardTitle>
                    {players &&
                    Object.keys(players).map((key) =>
                        <CardText key={key} className='py-1 my-0'>
                            {players[key].name}: <br/>
                            {edit ?
                                <Input onChange={this.handleLegacyChange}
                                       value={legacy[key]}
                                       name={key}
                                /> : `•\n${players[key].legacy ? players[key].legacy : ''}`
                            }
                        </CardText>
                    )
                    }
                    <hr className='my-3'/>
                    <CardTitle className='my-1'>
                        Previous Legacy:
                    </CardTitle>
                    {edit ?
                        <textarea className='w-100'
                                  rows='5'
                                  name='oldLegacy'
                                  onChange={this.handleChange}
                                  value={oldLegacy}
                        />
                        : gameData ?
                            gameData.oldLegacy.split('\n').map(i =>
                                <CardText className='my-2 py-0' key={i}>
                                    •{'\t'}{i}
                                </CardText>
                            ) : ''
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
        gameData: state.gameData,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameData);
