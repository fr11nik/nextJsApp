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
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import GavelIcon from '@material-ui/icons/Gavel';

export default function DirectorMenu() {
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
          <a href='/statistic'>
            <ListItemText primary='Статистика' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <a href='/directorpanel/customers'>
            <ListItemText primary='Рабочие' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <a href='/directorpanel/account'>
            <ListItemText primary='Аккаунт' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <a href='/auth'>
            <ListItemText primary='Настройки' />
          </a>
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='Добавить' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <a href='/directorpanel/addworkschedule'>
                <ListItemText primary='Задачу графика работ' />
              </a>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PlusOneIcon />
              </ListItemIcon>
              <a href='/directorpanel/addschedule'>
                <ListItemText primary='Справочники' />
              </a>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>
              <a href='/directorpanel/addnomenclature'>
                <ListItemText primary='Номенклатуру' />
              </a>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <a href='/directorpanel/workschedules'>
            <ListItemText primary='Отобразить графики работ' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <a href='/directorpanel/nomenclatureReport'>
            <ListItemText primary='Акт о выполненных работах' />
          </a>
        </ListItem>
      </List>
    </div>
  );
}
//{import('@material-ui/icons/' + item.icon)}
