import React from 'react';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const useStyles = makeStyles(theme => ({
      font: {
        fontFamily: '"Jua", sans-serif',
    },
  }));

const handleTutorial = () => {
    window.location = '/tutorial';
  };

export default function TutorialFab() {
    const classes = useStyles();

    return(
        <Tooltip title="Learn to Play" placement="bottom">
        <Chip
            label= "Tutorial"
            onClick={handleTutorial}
            color="primary"
            className={classes.font}
        />
        </Tooltip>
    );
}