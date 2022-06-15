import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';

import React from 'react';
import CookieController from '../../../private/CookieController';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AdminMenu(props) {
  const [open, setOpen] = React.useState(false);
  function onExit() {
    CookieController.eraseCookie('jwt');
    CookieController.eraseCookie('ssid');
    window.location.href = '/auth';
  }
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className='panelMenu'>
      <List component='nav'>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <a href='/userpanel/account'>
            <ListItemText primary='Аккаунт' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <a href='/userpanel/workschedules'>
            <ListItemText primary='Отобразить графики работ' />
          </a>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon style={{color: 'red'}} />
          </ListItemIcon>
          <a href='#' onClick={onExit}>
            <ListItemText style={{color: 'red'}} primary='Выход' />
          </a>
        </ListItem>
      </List>
    </div>
  );
}
