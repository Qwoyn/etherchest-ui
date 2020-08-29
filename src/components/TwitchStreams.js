import React from "react";
import {withRouter} from "react-router-dom";
import { TwitchStream } from 'react-twitch-stream';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1200,
    height: 450,
    backgroundColor: '#154A4A',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

  const tileData = [
    {
      title: '419stream',
      channel: '419stream',
    },
    {
      title: 'Snoop Dogg',
      channel: 'doggydog20',
    },
    {
      title: 'Dr Disrespect',
      channel: 'drdisrespect',
    },
    {
      title: 'Autumn Diver',
      channel: 'autumndiver',
    },
  ];
 
export const TwitchStreams = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={320} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <TwitchStream channelName={tile.channel} allowFullScreen autoPlay muted/>
            
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withRouter(TwitchStreams);