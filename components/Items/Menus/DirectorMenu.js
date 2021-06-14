import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import GavelIcon from '@material-ui/icons/Gavel';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CookieController from '../../../private/CookieController';
import EditIcon from '@material-ui/icons/Edit';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function DirectorMenu() {
  const [open, setOpen] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);
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
            <ListItem button>
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <a href='/directorpanel/consumptionrate/add'>
                <ListItemText primary='Норматив расхода' />
              </a>
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          onClick={() => {
            setOpenChange(!openChange);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary='Изменить' />
          {openChange ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openChange} timeout='auto' unmountOnExit>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <a href='/directorpanel/workschedule/change'>
              <ListItemText primary='График работ' />
            </a>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PlusOneIcon />
            </ListItemIcon>
            <a href='/directorpanel/configurationobjects/change'>
              <ListItemText primary='Справочники' />
            </a>
          </ListItem>
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
            <ListItemText primary='Акт о приёмке выполненных работ' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <a href='/directorpanel/consumptionrate/all'>
            <ListItemText primary='Нормативы расходов' />
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
//{import('@material-ui/icons/' + item.icon)}
