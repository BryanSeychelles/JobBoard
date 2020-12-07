import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputLabel, FormControl, Input} from '@material-ui/core';
import axios from 'axios'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        width : 345,
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function Offers() {

    const classes = useStyles();

    const handleExpandClick = (event) => {
        var id = event.currentTarget.name
        var elmt = document.getElementById(id)
        console.log(event.currentTarget)
        elmt.style.display = 'block';
    };

    const notExpand = (event) => {
        var id = event.currentTarget.name
        var elmt = document.getElementById(id)
        if (elmt.style.display === 'block'){
            elmt.style.display = 'none';
        }
    };

    const recupIdOffer = (e) => {
        e.preventDefault()
        console.log(e.currentTarget.name)
        var id = e.currentTarget.name;
	var URL = 'http://localhost:1337/offer/' + id + '/apply'
        axios.post(URL, {})
        .then( response => {
            console.log(response)
        })
        console.log(URL)
    }

    const locId = (e) => {
        e.preventDefault()
        var id = e.currentTarget.name;
        console.log(id)
        var URL = '/company/profil/'+id
        document.location.href= URL;
        }
    
        const [data, setData]= useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const result = await axios.get('http://localhost:1337/offers',)
                setData(result.data)
                console.log(result.data)
            }
            fetchData()
        }, [])

        return (
        <section className="container">
        <div id='search'>
            <TextField style={{marginLeft: '15%'}} id="standard-basic" label="Standard" />
            <FormControl style={{marginLeft: '10%'}}>
                <InputLabel htmlFor="salary">Salary</InputLabel>
                <Input type="number" id='salary' name='salary'/>
            </FormControl>
        </div>
            <div id="test">
                <div id='row_card'>
                    {data.map(item => (
                        <div id="card">
                                <Card className={classes.root}>
                                        <CardHeader
                                            avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                    {item.companyName[0]}
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton onClick={notExpand} name={item.id}>
                                                <CloseIcon />
                                            </IconButton>
                                            }
                                            title={item.companyName}
			                    subheader={item.updatedAt}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image="http://via.placeholder.com/640x360"
                                            title="Paella dish"
                                        />
                                    <CardActions disableSpacing>
                                        <IconButton onClick={recupIdOffer} name={item.id} aria-label="add to favorites">
                                            <PostAddIcon/>
                                        </IconButton>
                                        <IconButton onClick={locId} name={item.id} aria-label="profil">
                                            <AccountCircleIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleExpandClick}
                                            name={item.id}
                                            aria-label="show more"
                                        >
                                        <ExpandMoreIcon/>
                                        </IconButton>
                                    </CardActions>
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            {item.title}
                                            </Typography>
                                        </CardContent>
                                    <div id={item.id} className='collapse'>
                                        <CardContent id='textOffer'>
                                        <Typography paragraph>Description:</Typography>
                                        <Typography paragraph>
                                            {item.description}
                                        </Typography>
                                        </CardContent>
                                    </div>
                                </Card>
                            </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Offers 
