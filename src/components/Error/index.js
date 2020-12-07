import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        width: '100%',
        color: 'aliceblue'
      },
  }));

Error = () => {

    const classes = useStyles()

        return (
            <section className='container'>
                <div id="row">
                    <div className='square'>
                        <h1>Oups</h1>
                        <h4>
                            La page que vous chercher semble introuvable <br/>
                            code erreur : 404
                        </h4>
                        <Button className={classes.button}>Home</Button>
                    </div>
                </div>
            </section>

        );
}

export default Error