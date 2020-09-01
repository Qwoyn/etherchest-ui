import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Doughnut, Line} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';

const graphData1 = {
    labels: ['Diamond', 'Ruby', 'Saphire',
             'Onys', 'Obsidian'],
    datasets: [
      {
        label: 'NFT',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [10, 15, 25, 20, 30]
      }
    ]
  }
  
  const graphData2 = {
    labels: ['Apri', 'May', 'June',
             'July', 'August'],
    datasets: [
      {
        label: 'ETH',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#110531',
        borderColor: 'red',
        borderWidth: 2,
        data: [1, 2, 1.7, 1.9, 2, 2.8, 4]
      }
    ]
  }

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    dialroot: {
      height: 200,
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    paperBrown: {
      padding: theme.spacing(1),
      textAlign: 'center',
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#3f4f7c",
      fontFamily: '"Orbitron", sans-serif',
      color: "#977630"
    },
    paperRed: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#260518",
    },
    font: {
      fontFamily: '"Orbitron", sans-serif',
      color: "#977630"
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    vr: {
      borderleft: `5px solid #000000`,
      height: 500,
    },
    background: {
      backgroundColor: "#3f4f7c",
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-start',
      fontFamily: '"Orbitron", sans-serif',
      color: "#977630",
      
    },
  }));


export default function DashboardGraphs() {
  const classes = useStyles();

  return (
   <div>
       <Paper className={classes.paperBrown}>
        <Doughnut
          data={graphData1}
          options={{
            title:{
              display:true,
              text:'Asset Distribution',
              fontSize:20,
              fontColor:"#977630",
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
        <br/>
      
        </Paper>
        <Paper className={classes.paperBrown}>
        <Line
          data={graphData2}
          className={classes.font}
          options={{
            title:{
              display:true,
              text:'Portfolio Value (ETH)',
              fontSize:20,
              fontColor:"#977630",
            },
            legend:{
              display:false,
              position:'right',
              fontColor:"#000000",
            }
          }}
        />
        <br/>
      
        </Paper>
   </div>
  );
}