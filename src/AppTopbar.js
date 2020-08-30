import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DesktopTopbar from "../src/components/DesktopTopbar";

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <DesktopTopbar /> 
        );
    
    }
}