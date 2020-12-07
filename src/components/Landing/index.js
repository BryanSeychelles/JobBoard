import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
 

const Landing = () => {
    
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        title: {
            padding: theme.spacing(2),
            textAlign: 'center',
            fontSize: '2.2em',
            color: theme.palette.text.secondary,
          },
        overflow_none : {
            overflow: 'hidden',
        },
        '& > *': {
            margin: theme.spacing(1),
          },
      }));

    const classes = useStyles();

    return (
        <section>
            <div className="forrest">
                <div className ="normal">
                    <h1 className="job">Job</h1>
                </div>
                <div className="blurEffect">
                    <h1 className='board'><span>Board.com</span></h1>
                </div>
            </div>

            <Grid id ="forrest_2" item xs={12}></Grid>

            <div className={classes.overflow_none}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <p>
                                Absque ad conpositorum inquirente multatio cum reieci recensere defensione legitima legitima fas necessario consideratione 
                                tempus legitima recensere obductio causarum discessit Mesopotamia conpositorum rapinarum
                                a discernente noxiorum nullo celate quas ut et per et exturbatum sollemniter et carnifex recensere cum et inquirente quas detortum conpositorum et fas iudiciis discessit recensere saeviebat.
                            </p>
                            <h1>JobBoard.com</h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                                <h1>Demandeurs</h1>
                                <p>
                                    Absque ad conpositorum inquirente multatio cum reieci recensere defensione legitima legitima fas necessario consideratione 
                                    tempus legitima recensere obductio causarum discessit Mesopotamia conpositorum rapinarum
                                    a discernente noxiorum nullo celate quas ut et per et exturbatum sollemniter et carnifex recensere cum et inquirente quas detortum conpositorum et fas iudiciis discessit recensere saeviebat.
                                </p>
                                <Button className={classes.paper}>cliquez</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                                <h1>Entreprises</h1>
                                <p>
                                    Absque ad conpositorum inquirente multatio cum reieci recensere defensione legitima legitima fas necessario consideratione tempus legitima recensere obductio causarum discessit Mesopotamia conpositorum rapinarum a discernente noxiorum nullo celate quas ut et per et exturbatum sollemniter et carnifex recensere cum et inquirente quas detortum conpositorum et fas iudiciis discessit recensere saeviebat.
                                </p>
                                <Button className={classes.paper}>cliquez</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.title}>
                            <h1>
                                1 <br/>
                                Nam sole orto magnitudine.
                            </h1>
                            <p>
                            et signis prope ripam locatis ad manus comminus conserendas denseta scutorum conpage seme.
                            </p>
                        </Paper>
                    </Grid>
                    <Grid className="forrest_3" item xs={12} sm={6}></Grid>
                </Grid>
            </div>

        </section>
    )
}

export default Landing