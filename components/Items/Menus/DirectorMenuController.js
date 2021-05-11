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

export default function AdminPanel(props) {
  const onAddComponent = e => {
    e.preventDefault();
    const currentHref = e.target.offsetParent.children[1].href;
    props.loadComponent(
      import(
        '../Tabs/Director' + currentHref.substring(currentHref.lastIndexOf('/'))
      ),
    );
  };
  return (
    <div className='panelMenu'>
      <List component='nav'>
        <ListItem button>
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <a href='/statistic' onClick={onAddComponent}>
            <ListItemText primary='Статистика' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <a href='/customers' onClick={onAddComponent}>
            <ListItemText primary='Рабочие' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <a href='/auth'>
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
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <a href='/createWorkTask' onClick={onAddComponent}>
            <ListItemText primary='Создать график работ' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <a href='/showWorkTask' onClick={onAddComponent}>
            <ListItemText primary='Отобразить графики работ' />
          </a>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <a href='/auth'>
            <ListItemText primary='Ошибки в системе' />
          </a>
        </ListItem>
      </List>
    </div>
  );
}
