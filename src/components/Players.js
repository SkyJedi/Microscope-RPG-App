import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeData} from '../actions';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, Input, InputGroup} from 'reactstrap';
import {DeleteConfirmModal} from "./index";

class Players extends Component {
    state = {text: '', deleteConfirm: false};

    handleSubmit = () => {
        const {changeData, players} = this.props;
        let newObj = {...players};
        let newKey = Math.random().toString(36).substr(2, 10);
        newObj[newKey] = {name: this.state.text};
        changeData(newObj, 'players');
        this.setState({text: ''});
    };

    handleChange = (event) => {
        this.setState({text: event.target.value});
    };

    handleDelete = (deleteKey) => {
        const {changeData, players} = this.props;
        let newObj = {...players};
        delete newObj[deleteKey];
        changeData(newObj, 'players', false);
        this.setState({deleteConfirm: false});
    };

    render() {
        const {text} = this.state;
        const {players} = this.props;
        return (
            <Card color='warning' className='h-90 cardWidth'>
                <CardHeader className='font-weight-bold'>
                    Players
                </CardHeader>
                <CardBody style={{overflowY: 'scroll'}}>

                    {players &&
                    Object.keys(players).map(key =>
                        <CardText className='my-2' key={key}>
                            {players[key].name}
                            <Button size='sm' color='danger' name={key} className='align-self-end float-right'
                                            onClick={() => this.setState({deleteConfirm: key})}>Delete</Button>
                            <hr/>
                        </CardText>
                    )
                    }

                </CardBody>

                <CardFooter>
                    <InputGroup>
                        <Input value={text} name='text'
                               placeholder='Player Name'
                               onChange={this.handleChange}/>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </InputGroup>
                </CardFooter>
                <DeleteConfirmModal type='Player' handleConfirm={this.handleDelete}
                                    deleteConfirm={this.state.deleteConfirm}
                                    handleCancel={() => this.setState({deleteConfirm: false})}/>
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

export default connect(mapStateToProps, matchDispatchToProps)(Players);
