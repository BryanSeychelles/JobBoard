import React from 'react';
import axios from 'axios';
import { InputLabel, FormControl, Input, Button, Select, MenuItem} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

var loc = window.location
var locStr = loc.toString()
var id = locStr.substring(locStr.length-1, locStr.length)
var url = ''+id+''; // Route de l'offre à éditer
console.log('route', url)

class Forms_Offers extends React.Component {

    state = {
        offer : {}
    }

    componentDidMount() {
        fetch(url)
        .then(response => {
            return response.json()
        }).then(result => {
            this.setState({offer : result})
            console.log(result)
        })
    }

    constructor (props) {
        super(props)
        this.state = {
            type: '',
            cddDuration: '',
            job: '',
            salary:'',
            salaryDelay:'',
            region: '',
            description: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.TypeChange = this.TypeChange.bind(this)
        this.SalaryDelayChange = this.SalaryDelayChange.bind(this)
        this.RegionChange = this.RegionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    TypeChange(e) {
        this.setState({
            type : e.target.value,
        })
        if (e.target.value === 'CDD'){
            var CDD = document.getElementById('CDD');
            CDD.style.display = 'block';
        } else {
            var CDD = document.getElementById('CDD');
            CDD.style.display = 'none';
        }
    }

    SalaryDelayChange(e) {
        this.setState({
            salaryDelay : e.target.value,
        })
    }

    RegionChange(e) {
        this.setState({
            region : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   

        const {type} = this.state
        const {cddDuration}= this.state
        const {salary}= this.state
        const {job} = this.state
        const {salaryDelay} = this.state
        const {region} = this.state
        const {description} = this.state

        const data = {type : type, length : cddDuration, title : job, salary : salary+' '+salaryDelay, country : region, description: description}

        axios.put('', data) // reoute pour update l'offre
        .then(response => {
            this.setState({
                type: '',
                cddDuration: '',
                job: '',
                salary:'',
                salaryDelay:'',
                region: '',
                description: '',
            })
                console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })    
    }
   render() {

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl className='select'>
                    <InputLabel id='type' htmlFor='type'>Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name='type'
                        value={this.state.offer.type}
                        onChange={this.TypeChange}
                    >
                        <MenuItem value={'CDI'}>CDI</MenuItem>
                        <MenuItem value={'CDD'}>CDD</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ display: 'none' }} id="CDD" >
                    <FormControl>
                        <InputLabel htmlFor="cddDuration">CDD of</InputLabel>
                        <Input type="text" name='cddDuration' value={this.state.offer.cddDuration} onChange={this.handleChange} />
                    </FormControl>
                </div>
                <FormControl>
                    <InputLabel htmlFor="job">Job</InputLabel>
                    <Input type="text" id='job' name='job' value={this.state.offer.job} onChange={this.handleChange}  />
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="salary">Salary</InputLabel>
                    <Input type="number" id='salary' name='salary' value={this.state.offer.salary} onChange={this.handleChange} />
                </FormControl>
                <FormControl className='select'>
                    <InputLabel id='salary_delay' htmlFor='salary_delay'>Per ...</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name='salary_delay'
                        value={this.state.offer.salaryDelay}
                        onChange={this.SalaryDelayChange}
                    >
                        <MenuItem value={'per month'}>per month</MenuItem>
                        <MenuItem value={'per years'}>per year</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <FormControl className='select'>
                    <InputLabel id='region' htmlFor='region'>Région</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name='region'
                        value={this.state.offer.region}
                        onChange={this.RegionChange}
                    >
                        <MenuItem value={'Ile de France'}>Ile de France</MenuItem>
                        <MenuItem value={'Normandie'}>Normandie</MenuItem>
                        <MenuItem value={'Picardie'}>Picardie</MenuItem>
                        <MenuItem value={'Pas de Calais'}>Pas de Calais</MenuItem>
                    </Select>                
                </FormControl>
                <br/>
                <FormControl>
                    <TextField
                        id="standard-textarea"
                        label="Description"
                        placeholder="tape your description"
                        id='description'
                        name='description'
                        value={this.state.offer.description}
                        onChange={this.handleChange}
                        multiline
                    />
                </FormControl>
                <br/>
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

function Offers_() {

    return (
    
        <section id='contain_form'>
            <div id='form_offer' style={{marginLeft : 100}}>
                <Forms_Offers/>
            </div>
        </section>

    );
  }
  
export default Offers_
