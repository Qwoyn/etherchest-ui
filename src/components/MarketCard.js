import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { SeedIcon } from './Icons';
import { LandIcon } from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    background: "#DFB17B",
    minWidth:250,
    fontFamily: '"Jua", sans-serif',
  },
  media: {
    height: 140,
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
});

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const Link2 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export default function MarketCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
          title="Market"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
            <u>Markets</u>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.font}>
            Purchase Seeds or lease property to grow on.
          </Typography>
        </CardContent>
        <CardActions>
      <Link component={Link1} to="/markets">
        <IconButton color="primary" aria-label="Visit Seed Market">
        <SeedIcon /> 
      </IconButton>Seeds
        </Link>
        <Link component={Link2} to="/markets">
        <IconButton color="primary" aria-label="Visit Land Sales">
        <LandIcon /> 
      </IconButton>Land
        </Link>
      </CardActions>
    </Card>
  );
}