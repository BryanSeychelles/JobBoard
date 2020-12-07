import React from 'react';
import axios from 'axios';
import { InputLabel, FormHelperText, FormControl, Input, Button,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core/';
import {Link} from 'react-router-dom';


class Forms extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            Email:'',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {Email} = this.state
        const {password} = this.state

        const data = {email : Email, password: password}
            axios.post('http://localhost:1337/signin', data)
            .then(response => {
                this.setState({
                    Email: '',
                    password:'',
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })    
    }
   render() {

        const {Email, password} = this.state

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="Email">Email address</InputLabel>
                    <Input type="text" id='Email' name='Email' value={Email} onChange={this.handleChange} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id='password' name='password' value={password} onChange={this.handleChange} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                    <br/>
                </FormControl>
            </form>
        )
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    papers: {
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.secondary,
      },
    items : {
        width: '10%',
    },
    item: {
        color: 'black',
        textDecoration: 'none',
    },
  }));

function Login() {

      const classes = useStyles();


    return (
    
        <section id='testform_contain' >
            <div id='FormLogin'>
                <Forms/>
                <Grid container spacing={3}>
                    <Grid id={classes.items} item xs={6}>
                        <Paper className={classes.papers}>
                            <Link className={classes.item} to=''>
                                <Button>Home</Button>
                            </Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper id={classes.items} className={classes.paper}>
                            <Link className={classes.item} to='/forms/inscription'>
                                <Button>Create</Button>
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div id='forrest_4'>
                
            </div>
        </section>

    );
  }
  
export default Login
