import React, {Component, useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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

    var loc = window.location
    var locStr = loc.toString()
    var id = locStr.substring(locStr.length-1, locStr.length)
    var url = 'http://localhost:1337/companies/'+id+'/offers'; // Route de l'offre 
    var uri = 'http://localhost:1337/offer/'+id+'/applications' // Route des candidatures d'offre 
    console.log('route', url)
    console.log('route', uri)

    // Affichage des candidature d'offre 
    function Comments(){

        const classes = useStyles();
        const [data, setData]= useState([]);
    
        useEffect(() => {
            const fetchData = async () => {
                const response = await axios.get(uri)
                setData(response.data)
                console.log('données', response.data)
            }
            fetchData()
        }, [])
    
        return (
            <CardContent>
                {data.map(item => (
                    <List className={classes.rout}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={item.title}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {item.body}
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                    </List>
                ))}
            </CardContent>
        )
    }

    // Affichage de l'offre
class OfferId extends Component {

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

    render() {
        return(
            <Card variant="outlined">
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                    Offers
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {this.state.offer.title}
                    </Typography>
                    <Typography color="textSecondary">
                    adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                    {this.state.offer.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>
                        back
                    </Button>
                </CardActions>
                <Comments/>
            </Card>
        )
    }
}

function Company() {

    return (
        <section id='container_admin'>
            <div className='presentation'>
                <OfferId/>
            </div>
        </section>
    )
};

export default Company;
