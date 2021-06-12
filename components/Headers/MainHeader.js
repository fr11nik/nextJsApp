import MainLogo from '../Items/Logos/MainLogo';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CookieController from '../../private/CookieController';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
const MainHeader = props => {
  const router = useRouter();
  const [roles, setRoles] = React.useState(props.roles);
  function onExit() {
    CookieController.eraseCookie('jwt');
    CookieController.eraseCookie('ssid');
    router.push('/auth');
  }
  const handleChange = event => {
    window.location.href = '/' + event.target.value + 'panel/';
  };
  useEffect(() => {
    if (CookieController.readCookie('jwt')) {
      if (document.getElementsByClassName('signin')[0]) {
        document.getElementsByClassName('signin')[0].remove();
      }
    } else {
      document.getElementsByClassName('signOutButton')[0].remove();
      document.getElementsByClassName('panelPicker')[0].remove();
    }
  });
  return (
    <header>
      <div className='header'>
        <div className='header__inner'>
          <MainLogo text='РЕСОТСТРОЙ'></MainLogo>
        </div>

        <Select
          className='panelPicker'
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          name='scheduleName'
          onChange={handleChange}
        >
          {props.roles.map((role, index) => (
            <MenuItem key={index} className='menuItemOverflow' value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <Button
          href='/auth'
          style={{borderRadius: '0px', boxShadow: 'none'}}
          className='signin'
          variant='contained'
          color='primary'
        >
          Вход
        </Button>
        <div className='signOutButton'>
          <Fab className='fabExit' aria-label='Выйти' onClick={onExit}>
            <ExitToAppIcon />
          </Fab>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
