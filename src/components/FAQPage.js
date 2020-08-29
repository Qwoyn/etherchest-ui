import React from "react";
import {withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#DFB17B',
  },
  background: {
    backgroundColor: '#154A4A',
  },
  text: {
    color: "#DFB17B"
  }
}));

export const FAQPage = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
  
	const handleChange = panel => (event, isExpanded) => {
	  setExpanded(isExpanded ? panel : false);
	};
  
    return (
      <div className="card-blank-sand-3">
      <font color="#DFB17B">
		  <h3><b>Hashkings is an independently developed game and decentralized application (dApp) running on the STEEM blockchain. 
			The project officially started in October 2018 on the Ethereum blockchain but migrated to STEEM in January 2019 in an effort 
			to expand into a growing new platform.</b></h3></font>
      <font color="#DFB17B">
			<h3><b>The development team consists of three core members: Daniel Pittman, Steven Ettinger and J. Rawsthorne. Their 
			background experience includes Cannabis Cultivation, Ethereum Smart Contracts, Steemjs, Dlux VR, Node, Frontend and Backend api 
			design.</b></h3></font>
      <font color="#DFB17B">
			<h3><b>Designed to be a virtual Cannabis farming game that implements STEEM tokens on the blockchain, Hashkings intends to 
			be educational as well as interactive. The internal game mechanics allow you to stake your STEEM in return for beneficiary 
			rewards. These returns are generated through the STEEM blockchain rewards pool and paid out to players over time. This 
			creates a micro-economy within the dApp that evolves and grows with the game itself.</b></h3>
      </font>
      <font color="#DFB17B">
			<h3><b>Our vision is to create the next generation of dApps powered by blockchain technologies. Not only to entertain but to 
			educate and enrich the community. Help us to continue creating quality independently developed software in the future.</b></h3>
			</font>
      <font color="#DFB17B">
      <h1><b>Frequently asked Questions</b></h1>
      </font>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}><b>What is Hashkings?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
		  Hashkings is a virtual Cannabis farming game on the STEEM blockchain. 
		  You can lease plots of land, buy seeds and grow your own plants which are then 
		  harvested and sold at market. 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}><b>How do you earn from the game?</b></Typography>   
		  </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
			When farmers take care of their plants they grow points toward votes... 
			distributing the inflation 
			controlled by our collective Steem power. This is done by placing our growers as 
			beneficiaries on 
			semi-automated posts, and then voting on these posts. 
			Additionally, any extra game mechanics purchased contribute to our SP... 
			increasing over time the benefits for everybody involved. In short, 
			contribute to the SP and earn the 
			benefactor rewards off the semi-automated posts everyday.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}><b>Does it cost money to play?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
		  Yes, there is an initial leasing fee and a 20 SP delegation for each plot
			  seeds also cost a small amount of STEEM to purchase.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}><b>Where do I begin?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
		      Head on over to the<a href="/tutorial">
          tutorial</a> by following the link or click "New to Hashkings?" in the top right hand corner. 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography className={classes.heading}><b>What should I do after I plant my seeds?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
			Go to "Ganja Farm" and click "Farming". There you will find the Watering function.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography className={classes.heading}><b>How often should I water my plants?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
			No more than once per day is fine.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel8'} onChange={handleChange('panel8')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography className={classes.heading}><b>What happens if I forget to water?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
			If you forget to water, your plants will not grow and your 
			payouts will also stop for that day.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel9'} onChange={handleChange('panel9')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Typography className={classes.heading}><b>What are the differences between seeds?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
            Please visit 
          <a href="https://steempeak.com/hashkings/@hashkings/hashkings-seeds-small-overview">
            Our Seeds overview</a> on steempeak to learn more.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  <ExpansionPanel expanded={expanded === 'panel10'} onChange={handleChange('panel10')} className={classes.background}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10bh-content"
          id="panel10bh-header"
        >
          <Typography className={classes.heading}><b>How many garden plots/seeds can I own?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.text}>
          <Typography>
			There are a total of 2520 plots of land available and you can own as many as are available at the time of delegation. At the moment you can own as many seeds as your green thumb can handle.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
	  </div>
    );
};

export default withRouter(FAQPage);