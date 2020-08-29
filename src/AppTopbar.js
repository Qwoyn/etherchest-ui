import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FarmIcon } from './components/Icons';
import Grid from '@material-ui/core/Grid';
import DesktopTopbar from "../src/components/DesktopTopbar";
import {AppInlineProfile} from "./AppInlineProfile";
import IconButton from '@material-ui/core/IconButton';

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    isDesktop() {
        return window.innerWidth > 1000;
      }

    render() {
        if (this.isDesktop()){
        return (
            <DesktopTopbar /> 
        );
    } else {
        return(
            <div className="layout-topbar clearfix">
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <Grid container spacing={0}>
                            <Grid item xs={1}>
                            <IconButton className="layout-menu-button" onClick={this.props.onToggleMenu}>
                            <FarmIcon />
                            </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11}>
                        <div className="layout-topbar-icons button">
                            <AppInlineProfile />
                        </div>
                    </Grid>
                </Grid>
            </div>
            
        );
    }
    }
}