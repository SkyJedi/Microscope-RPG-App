import React, {Component} from 'react';
import {GameData, Log, Palette, Players} from './index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {changeData} from "../actions";

class Selector extends Component {
    state = {dropdownOpen: false};

    handleClick = (event) => {
        const {changeData} = this.props;
        switch (event.target.value) {
            case 'Palette':
                changeData(<Palette/>, 'show');
                break;
            case 'GameData':
                changeData(<GameData/>, 'show');
                break;
            case 'Log':
                changeData(<Log/>, 'show');
                break;
            case 'Players':
                changeData(<Players/>, 'show');
                break;
            case 'hide':
                changeData(false, 'show');
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen}
                            toggle={() => this.setState({dropdownOpen: !this.state.dropdownOpen})}>
                <DropdownToggle size='lg' color='black' bgcolor='white' className='py-0' style={{fontSize: '1.8rem'}}>
                    ☰
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem value='hide' onClick={this.handleClick}>Hide</DropdownItem>
                    <DropdownItem value='GameData' onClick={this.handleClick}>GameData</DropdownItem>
                    <DropdownItem value='Log' onClick={this.handleClick}>Log</DropdownItem>
                    <DropdownItem value='Palette' onClick={this.handleClick}>Palette</DropdownItem>
                    <DropdownItem value='Players' onClick={this.handleClick}>Players</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        periods: state.periods,
        events: state.events,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeData}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Selector);

