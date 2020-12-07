import React, {Component, useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
      },
  }));

  function On() {
      var infos = document.getElementById('infos')
      infos.style.display = 'block'
  }

  function Off() {
    var infos = document.getElementById('infos')
    infos.style.display = 'none'
}

class DataUsers extends Component {

    state = {
        user : {}
    }

    componentDidMount() {
        fetch('http://localhost:1337/account')
        .then(response => {
            return response.json()
        }).then(result => {
            this.setState({user : result})
            console.log(result)
        })
    }

    render() {
        return (
        <div className='presentation'>
            <table>
                <tbody>
                    <tr>
                        <td id='text'>
                            <h1 id="h1">
                            {this.state.user.name}
                            </h1>
                            <p id="p">
                                Eodem tempore Serenianus ex duce, cuius ignavia populatam in Phoenice Celsen ante rettulimus, pulsatae maiestatis imperii reus iure postulatus ac lege, incertum qua potuit suffragatione absolvi, aperte convictus familiarem suum cum pileo, quo caput operiebat, incantato vetitis artibus ad templum misisse fatidicum, quaeritatum expresse an ei firmum portenderetur imperium, ut cupiebat, et cunctum.
                            </p>
                        </td>
                        <td onMouseOver={On} onMouseOut={Off} id="photo">
                            <img id='avatar' src="https://placebear.com/640/360"/>
                            <Link to='/forms/admin/company'>
                                <div id='infos'>
                                    <Button style={{marginTop : '65%'}} size="small" color="primary">
                                        Modifier profil
                                    </Button>
                                </div>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        )
    }
}

function Delete(name) {
    var id = name; //id à ajouter à la route
    axios.delete(/* route supression d'offre */)
    .then(res => {
        console.log(res)
    })
}

function Applicant() {
    const classes = useStyles();
    const [data, setData]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(/*ajouter route pour récupérer tout les candidatures du demandeurs*/)
            setData(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])
    return (
        <section id='container_admin_app'>
            <DataUsers/>
            <div id='container_offers' style={{ height: 500, width: '100%',}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="right">&nbsp;</TableCell>
                            <TableCell align="right">
                                <Link to='/offers'>
                                    <Button>
                                        <AddIcon/>
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map(item => (
                            <TableRow key={item.name}>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.calories}</TableCell>
                            <TableCell align="right">{item.fat}</TableCell>
                            <TableCell align="right">{item.carbs}</TableCell>
                            <TableCell align="right">{item.protein}</TableCell>
                            <TableCell align="right">
                            <Button onClick={() => {Delete(item.id)}}className={classes.btn} variant="contained" color="secondary">
                                <DeleteIcon/>
                            </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>            
            </div>
        </section>
    )
};

export default Applicant;