import React, {Component, useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    rout: {
        width: '100%',
    },
    inline: {
        display: 'inline',
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

const handleExpandClick = (event) => {
    var id = event.currentTarget.name
    var locApi = '/admin/company/offer/'+id
    document.location = locApi
};

function Delete(name) {
    var id = name; //id à ajouter à la route
    axios.delete(/* route supression d'offre */)
    .then(res => {
        console.log(res)
    })
}

function Edit(name) {
    var id = name; //id à ajouter à la route
    var locEdit = '/forms/company/offers/edit'+id
    window.location.href = locEdit
}

function Company() {

    const classes = useStyles();
        
    const [data, setData]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:1337/account/offers',)
            setData(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])

    return (
        
        <section id='container_admin'>
            <DataUsers/>
            <div id='container_offers'>
                <div id='add'>
                    <Link to='/forms/company/offers'>
                        <Button style={{width: '100%'}}>
                            <AddIcon to='/forms/company/offers'/>
                        </Button>
                    </Link>
                </div>
                {data.map(item => (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Offers
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {item.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        {item.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => {Delete(item.id)}}>
                            <DeleteIcon/>
                        </Button>
                        <Button onClick={() => {Edit(item.id)}}>
                            <CreateIcon/>
                        </Button>
                        <Button onClick={handleExpandClick} name={item.id} >
                            <VisibilityIcon/>
                        </Button>
                    </CardActions>
                </Card>
                ))}
            </div>
        </section>
    )
};

export default Company;
