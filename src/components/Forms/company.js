import React from 'react';
import axios from 'axios';
import { InputLabel, FormHelperText, FormControl, Input, Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Delete(name) {
    var id = name; //id à ajouter à la route
    axios.delete(/* route supression d'offre */+id)
    .then(res => {
        console.log(res)
    })
}

class Company extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            logo:'',
            selectDate:'',
            numberEmployee:'',
            description:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.CompanysLogo = this.CompanysLogo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    CompanysLogo(e){
        this.setState({
            'logo' : e.target.result,
        })
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])

        reader.onload=(e)=>{
            console.warn('file data', e.target.result)
            const fileData = {logo : e.target.result}
            axios.post('http://localhost:1337/upload/image', fileData)
            .then(response => console.log('resultLogo', response))
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleDateChange(e) {
        this.setState({
            'selectDate' : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {companyName}= this.state
        const {Email} = this.state
        const {selectDate}= this.state
        const {numberEmployee}= this.state;
        const {description}= this.state;

        const data = {companyName : companyName, email : Email, CreateDate: selectDate, Employee: numberEmployee, Description: description}
            axios.post('http://localhost:1337/account/edit', data)
            .then(response => {
                this.setState({
                    logo:'',
                    selectDate:'',
                    companyName: '',
                    Email: '',
                    numberEmployee:'',
                    description:''
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })    
    }

   render() {

        const {logo, selectDate, companyName, Email, numberEmployee, description} = this.state;

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl style={{marginLeft : '5vw'}}>
                    <InputLabel htmlFor="companyName">Company's Name</InputLabel>
                    <Input type="text" name='companyName' value={companyName} onChange={this.handleChange} />
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="logo">Logo</InputLabel>
                    <Input type="file" accept="image/png, image/jpeg" value={logo} id='logo' name='logo' onChange={this.CompanysLogo} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Logo.</FormHelperText>
                </FormControl>
                <br/>
                <div style={{marginLeft : '5vw'}}>
                    <input
                        type='date'
                        onChange={this.handleDateChange}
                        value={selectDate}
                    />
                </div>
                <br/>
                <FormControl style={{marginLeft : '5vw'}} >
                    <InputLabel htmlFor="numberEmployee">Number employee</InputLabel>
                    <Input type="number" id='numberEmployee' name='numberEmployee' value={numberEmployee} onChange={this.handleChange} aria-describedby="my-helper-text" />
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}} >
                    <TextField
                        id="standard-textarea"
                        label="Description"
                        placeholder="tape your description"
                        id='description'
                        name='description'
                        value={description}
                        onChange={this.handleChange}
                        multiline
                    />
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}}>
                    <InputLabel htmlFor="Email">Email address</InputLabel>
                    <Input type="text" id='Email' name='Email' value={Email} onChange={this.handleChange} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '6vw'}} >
                    <Button type="submit" variant="contained" color="primary">
                    Save Changes
                    </Button>
                    <br/>
                </FormControl>
                <FormControl style={{marginLeft : '6vw'}} >
                    <Button onClick={()=> {Delete(/*user.id*/)}} type="submit" variant="contained" color="secondary">
                        Delete account
                    </Button>
                    <br/>
                </FormControl>
            </form>
        )
    }
}

function FormsCompany() {
    
    return (
    
        <section id='container'>
            <div id="formProfil">
                <Company />
            </div>
        </section>

    );
  }
  
export default FormsCompany;
