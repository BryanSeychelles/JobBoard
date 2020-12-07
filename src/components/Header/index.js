import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
    backgroundColor: 'rgba(124, 124, 124, 0.26)',
  },
  item: {
      color: 'black',
      textDecoration: 'none',
  },
  text: {
    textAlign: 'center',
}
});

 function Header() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText className={classes.text} primary="user.name" />
            </ListItem>

          <Link className={classes.item} to=''>
            <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText className={classes.text} primary="Home" />
            </ListItem>
          </Link>


          <Link className={classes.item} to='/forms/login'>
            <ListItem button>
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.text} primary="Authentification" />
            </ListItem>
          </Link>

          <Link className={classes.item} to='/offers'>
            <ListItem button>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.text} primary="Offers" />
            </ListItem>
          </Link>

          <Link className={classes.item} to='/'>
            <ListItem button>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.text} primary="My Profil" />
            </ListItem>
          </Link>
        </List>
    </div>
  );

  return (
    <div className="menu">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Header
