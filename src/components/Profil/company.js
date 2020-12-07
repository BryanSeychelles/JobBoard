import React, {Component} from 'react';
import Background from '../img/people/default.png'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Footer from '../Footer/index';

var loc = window.location
var locToString = loc.toString()
var id = locToString.substring(locToString.length-1, locToString.length)
var url = 'http://localhost:1337/companies/' + id;

class AffUser extends Component {


     state = {
        user : {}
    }

    componentDidMount() {
        console.log(url)
        fetch(url)
        .then(response => {
            return response.json()
        }).then(result => {
            this.setState({user : result})
            console.log(result)
        })
    }

    render() {
        return(
            <Card id='offerId'>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    A
                </Avatar>
                }
                action={
                    <div>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                }
                title={this.state.user.name}
                subheader={this.state.user.website}
            />
            <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
            </CardContent>
        </Card>
        )
    }

}

function CompanyId() {

     return (
        <section className="container">
            <div id="testProfil" style={{backgroundImage: `url(${Background})`}}>
                <div id='contain'>
                    <AffUser/>
                    <Footer/>
                </div>
            </div>
        </section>
    )
}

export default CompanyId
