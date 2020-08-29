import React, {useState, useContext, useEffect} from "react";
import { StateContext } from "./App";
import Chip from '@material-ui/core/Chip';
import LockOpen from '@material-ui/icons/LockOpen';
import Avatar from '@material-ui/core/Avatar';
//import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { HashkingsAPI } from "./service/HashkingsAPI";
import api from './service/SteemConnectAPI';
import Modal from '@material-ui/core/Modal';
import Profile from './components/Profile.js';

const access_token = localStorage.getItem("sc_token");

/*function rand() {
  return Math.round(Math.random() * 20) - 10;
}*/

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const handleClick = () => {
  window.location = '/login';
};

const handleApparel = () => {
  //window.location = 'https://www.bonfire.com/hashkings-community-shirts/';
  window.open('https://www.bonfire.com/hashkings-community-shirts/');
};

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
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
paper: {
  position: 'absolute',
  width: 'auto',
  maxHeight: 'auto',
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
},
}));

export const AppInlineProfile = () => {
  const hashkingsApi = new HashkingsAPI();
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [validatedTo, setValidatedTo] = useState();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    hashkingsApi.steemUserExists(username).then(username => {
      if (username) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [username]);


  const handleDelete = () => {
    alert('Need to sign out? Please clear your cache to sign out completely.');
  };

  // Logout function, revoke access token
const logOut = () => {
  api.revokeToken(function(err, res) {
      if (res && res.success) {
          username = null;
          document.location.href = '/login';
      }
  });
  return false;
};

  if (!username) {
    return (
      <div className="profile">
        
        {/*<HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Maintenance Mode<br/>Be back shortly, please check our twitter for updates</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
      <Chip
        icon={<BuildIcon />}
        color="secondary"
        label= "Maintenance Mode"
        onClick={handleClick}
        className={classes.font}
      />
      </HtmlTooltip>*/}

        <Tooltip title="Please Sign In to Begin" placement="left">
      <Chip
        icon={<LockOpen />}
        color="primary"
        label= "Not signed in"
        onClick={handleClick}
        className={classes.font}
      />
      </Tooltip>
      <Tooltip title="Visit Bonfire.com" placement="left">
      <Chip
        label= "Hoodies!"
        onClick={handleApparel}
        className={classes.font}
      />
      </Tooltip>
      <br/>
    </div>
    );
  } else {
  return (
    <div className="profile">
            {/*<HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Maintenance Mode<br/>Be back shortly, please check our twitter for updates</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
        <Chip
          icon={<BuildIcon />}
          color="secondary"
          label= "Maintenance Mode"
          onClick={handleClick}
          className={classes.font}
        />
      </HtmlTooltip>*/}

      <Tooltip title="Signed In" placement="bottom">
      <Chip
        icon={<Avatar className={classes.avatar}>
        {validatedTo && (
        <div>
          <img
          alt="STEEM Avatar"
          src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
          />
          </div>
          )}
        </Avatar>}
        label= {username}
        color="primary"
        //onDelete={logOut}
        onClick={handleOpen}
        className={classes.font}
      />
        </Tooltip> 
      <Tooltip title="Visit Bonfire.com" placement="bottom">
      <Chip
        label= "Hoodies!"
        onClick={handleApparel}
        className={classes.font}
      />
      </Tooltip>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Profile />
        </div>
      </Modal>
    </div>
  );
  }
};
