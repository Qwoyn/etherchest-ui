import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { AppInlineProfile } from '../AppInlineProfile';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    fontblack: {
      fontFamily: '"Orbitron", sans-serif',
      color: "#e1c58b"

    },
    title: {
      fontSize:9,
      fontFamily: '"Orbitron", sans-serif',
      color: "#211448"
    }
  }));


export default function DesktopTopbar(){
    const classes = useStyles();

    return (
<div className="layout-topbar clearfix">
<Grid container spacing={0}>
    <Grid item xs>
        <Grid container spacing={0}>
              <Grid item xs={6}>
                <IconButton className="layout-menu-button" disabled="true">
                  <Typography className={classes.fontblack}>Etherchest.com</Typography>
                </IconButton>
                
                <IconButton className="layout-menu-button" disabled="true">
                  <Typography className={classes.title} gutterBottom>
                  ETH 2.0
                  </Typography>
                </IconButton>
            </Grid> 
        </Grid>
    </Grid>
    <AppInlineProfile />
</Grid>
</div> 
    );
}