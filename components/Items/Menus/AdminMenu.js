import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';

export default function AdminMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className='panelMenu'>
      <List component='nav'>
        <ListItem button>
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <a href='/adminpanel/statistic'>
            <ListItemText primary='Статистика' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <a href='/adminpanel/customers'>
            <ListItemText primary='Пользователи' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <a href='/adminpanel/account'>
            <ListItemText primary='Аккаунт' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <a href='/adminpanel/auth'>
            <ListItemText primary='Настройки' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <a href='/adminpanel/adduser'>
            <ListItemText primary='Добавить пользователя' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <a href='/adminpanel/auth'>
            <ListItemText primary='Ошибки в системе' />
          </a>
        </ListItem>
      </List>
    </div>
  );
}
