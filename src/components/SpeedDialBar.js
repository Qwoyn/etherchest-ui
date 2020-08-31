import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import HttpsIcon from '@material-ui/icons/Https';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <HttpsIcon />, name: 'Connect Metamask' },
  { icon: <AccountBalanceWalletIcon />, name: 'Make a Deposit' },
  { icon: <ChatIcon />, name: 'Visit Discord' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];

export default function OpenIconSpeedDial() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<DehazeIcon openIcon={<ArrowDropUpIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}