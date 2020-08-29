import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FarmIcon } from './Icons';
import { GerminateIconBlack } from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minWidth: 250,
    background: "#DFB17B",
    fontFamily: '"Jua", sans-serif',
  },
  media: {
    height: 140,
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
});

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Box boxShadow={12}>
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/RgYo3qZ.png"
          title="South America Plot"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
            <u>Farming</u>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
          Vist your Farm and check your inventory or visit your stats
          </Typography>
        </CardContent>
      <CardActions>
      <Link component={Link1} to="/farm">
        <IconButton color="primary" aria-label="Visit Farm">
        <GerminateIconBlack /> 
      </IconButton>Farm
        </Link>
        <Link component={Link1} to="/accounting">
        <IconButton color="primary" aria-label="Visit Farm">
        <FarmIcon /> 
      </IconButton>Office
        </Link>
      </CardActions>
    </Card>
    </Box>
  );
}