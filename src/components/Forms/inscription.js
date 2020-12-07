import React from 'react';
import axios from 'axios';
import { InputLabel, FormHelperText, FormControl, Input, Button, Select, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core/';
import {Link} from 'react-router-dom';


class Forms extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            lastName : '',
            firstName : '',
            companyName:'',
            Email:'',
            password: '',
            confirm_password: '',
            who: 'Applicants'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChanger = this.handleChanger.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleChanger(e) {
        this.setState({
            who : e.target.value,
        })
        if (e.target.value === 'Company'){
            var applicant = document.getElementById('applicant');
            applicant.style.display = 'none';
            var company = document.getElementById('company');
            company.style.display = 'block';
        } else {
            var applicant = document.getElementById('applicant');
            applicant.style.display = 'block';
            var company = document.getElementById('company');
            company.style.display = 'none';
        }
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {lastName} = this.state
        const {firstName}= this.state
        const {companyName}= this.state
        const {Email} = this.state
        const {password} = this.state
        const {confirm_password} = this.state
        const {who} = this.state

        const data = {type : who, companyName : companyName, lastName : lastName, firstName : firstName, email : Email, password: password}

        if (password === confirm_password) {
            axios.post('http://localhost:1337/signup', data)
            .then(response => {
                this.setState({
                    lastName: '',
                    firstName: '',
                    companyName: '',
                    Email: '',
                    password:'',
                    confirm_password:'',
                    who: ''
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })    
        }
        if (password !== confirm_password) {
            alert('Password and confirm password are different')
        }
    }
   render() {

        const {lastName, firstName, companyName, Email, password, confirm_password, who} = this.state

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl className='select'>
                    <InputLabel id='who' htmlFor='who'>Who are you</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name='who'
                        value={who}
                        onChange={this.handleChanger}
                    >
                        <MenuItem value={'Applicants'}>Applicants</MenuItem>
                        <MenuItem value={'Company'}>Company</MenuItem>
                    </Select>
                </FormControl>
                <div id="applicant" >
                    <FormControl>
                        <InputLabel htmlFor="lastName">lastName</InputLabel>
                        <Input type="text" id='lastName' name='lastName' value={lastName} onChange={this.handleChange}  />
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="firstName">firstName</InputLabel>
                        <Input type="text" id='firstName' name='firstName' value={firstName} onChange={this.handleChange} />
                    </FormControl>
                </div>
                <div style={{ display: 'none' }} id="company" >
                    <FormControl>
                        <InputLabel htmlFor="companyName">Company's Name</InputLabel>
                        <Input type="text" name='companyName' value={companyName} onChange={this.handleChange} />
                    </FormControl>
                </div>
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
                    <InputLabel htmlFor="confirm_password">Confirm your Password</InputLabel>
                    <Input type="password" id='confirm_password' name='confirm_password' value={confirm_password} onChange={this.handleChange} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">please confirm your password.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
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
    company: {
        display: 'none',
    },
    item: {
        color: 'black',
        textDecoration: 'none',
    },
  }));

function Inscription() {

      const classes = useStyles();


    return (
    
        <section id='testform_contain' >
            <div id='testForm'>
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
                            <Link className={classes.item} to='/forms/login'>
                                <Button>Login</Button>
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div id='forrest_3'>
                
            </div>
        </section>

    );
  }
  
export default Inscription
