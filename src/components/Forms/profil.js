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

class FormsProfil extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            profilPicture :'',
            lastName: '',
            firstName: '',
            Email: '',
            cv : '',
            letter:'',
            phoneNumber:'',
            descriptioon:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.Picture = this.Picture.bind(this)
        this.CurriculumVitae = this.CurriculumVitae.bind(this)
        this.CoverLetter = this.CoverLetter.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    Picture(e){
        this.setState({
            'profilPicture' : e.target.result,
        })
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])

        reader.onload=(e)=>{
            console.warn('file data', e.target.result)
            const filePicture = {picture : e.target.result}
            axios.post('http://localhost:1337/upload/image', filePicture)
            .then(response => console.log('resultPP', response))
        }
    }

    CurriculumVitae(e){
        this.setState({
            'cv' : e.target.result,
        })
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])

        reader.onload=(e)=>{
            console.warn('file data', e.target.name)
            const fileCv = {cv : e.target.result}
            axios.post('http://localhost:1337/upload/resume', fileCv)
            .then(response => console.log('result cv', response))
        }
    }

    CoverLetter(e){
        this.setState({
            'letter' : e.target.result,
        })
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])

        reader.onload=(e)=>{
            console.warn('file data', e.target.result)
            const fileLetter = {letter : e.target.result}
            axios.post('http://localhost:1337/upload/letter', fileLetter)
            .then(response => console.log('result letter', response))
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {lastName} = this.state
        const {firstName}= this.state
        const {Email} = this.state
        const {profilPicture} = this.state;
        const {cv}= this.state;
        const {letter}= this.state;
        const {phoneNumber}= this.state;
        const {description}= this.state;

        const data = {  ProfilPicture : profilPicture, lastName : lastName, firstName : firstName, email : Email, CurriculumVitae: cv, CoverLetter: letter, PhoneNumber: phoneNumber, Description: description}
            axios.post('http://localhost:1337/account/edit', data)
            .then(response => {
                this.setState({
                    profilPicture :'',
                    lastName: '',
                    firstName: '',
                    Email: '',
                    cv : '',
                    letter:'',
                    phoneNumber:'',
                    description:''
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })    
    }
   render() {

        const {profilPicture,lastName, firstName, Email, cv, letter, phoneNumber, description} = this.state

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="profilPicture">Profil picture</InputLabel>
                    <Input type="file" accept="image/png, image/jpeg" id='profilPicture' value={profilPicture} name='profilPicture' onChange={this.Picture} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Image.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="cv">Curriculum Vitae</InputLabel>
                    <Input type="file" accept="file/pdf, file/pdf" id='cv' value={cv} name='cv' onChange={this.CurriculumVitae} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Curriculum Vitae.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="letter">Cover letter</InputLabel>
                    <Input type="file" accept="file/pdf, file/pdf" id='letter' value={letter} name='letter' onChange={this.CoverLetter} aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Cover letter.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}} >
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <Input type="text" id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={this.handleChange} aria-describedby="my-helper-text" />
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}}>
                    <InputLabel htmlFor="lastName">lastName</InputLabel>
                    <Input type="text" id='lastName' name='lastName' value={lastName} onChange={this.handleChange}  />
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}}>
                    <InputLabel htmlFor="firstName">firstName</InputLabel>
                    <Input type="text" id='firstName' name='firstName' value={firstName} onChange={this.handleChange} />
                </FormControl>
                <br/>
                <FormControl style={{marginLeft : '5vw'}}>
                    <InputLabel htmlFor="Email">Email address</InputLabel>
                    <Input type="text" id='Email' name='Email' value={Email} onChange={this.handleChange} aria-describedby="my-helper-text" />
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
                <br/>
                <FormControl style={{marginLeft : '5vw'}} >
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

function Profil() {

    return (
    
        <section id='container'>
            <div id="formProfil">
                <FormsProfil />
            </div>
        </section>

    );
  }
  
export default Profil;
