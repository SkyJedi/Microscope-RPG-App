import React, {Component} from 'react';
import * as Components from './index';
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
                changeData(<Components.Palette/>, 'show');
                break;
            case 'Log':
                changeData(<Components.Log/>, 'show');
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
                <DropdownToggle caret size='sm' color='link'>
                    Selector
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem value='hide' onClick={this.handleClick}>Hide</DropdownItem>
                    <DropdownItem value='Log' onClick={this.handleClick}>Log</DropdownItem>
                    <DropdownItem value='Palette' onClick={this.handleClick}>Palette</DropdownItem>
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

