import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Footer = () => {

    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          color: 'white',
          backgroundColor: 'rgb(70, 68, 68)',
        },
        papers: {
            textAlign: 'center',
            padding: theme.spacing(2),
            color: 'white',
            backgroundColor: 'rgb(70, 68, 68)',
          },
        overflow_none : {
            overflow: 'hidden',
        },
        link: {
            marginLeft: theme.spacing(2),
          },
      }));

      const classes = useStyles();
      
    return (
        <div className={classes.overflow_none}>
            <Grid id='footer' container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>JobBoard.com</h1>
                        <h4>+345 353 372</h4>
                        <h4>services@jobteaser.eu</h4>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <p id="copy">copyright © 2020</p>
                    </Paper>
                </Grid>
        </Grid>
        </div>
    )
}

export default Footer
