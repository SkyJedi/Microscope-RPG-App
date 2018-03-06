import React, {Component} from 'react';
import * as Components from './index';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export default class Selector extends Component {
    state = {dropdownOpen: false};

    handleClick = (event) => {
        switch (event.target.value) {
            case 'Palette':
                this.props.handleShow(<Components.Palette/>);
                break;
            case 'Log':
                this.props.handleShow(<Components.Log/>);
                break;
            case 'hide':
                this.props.handleShow(false);
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

