import MainLogo from '../Items/Logos/MainLogo';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CookieController from '../../private/CookieController';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {render} from 'react-dom';
const MainHeader = props => {
  const router = useRouter();

  function onExit() {
    CookieController.eraseCookie('jwt');
    CookieController.eraseCookie('ssid');
    router.push('/auth');
    const a = (document.getElementsByClassName('signOutButton')[0].className =
      'signOutButton btnhide');
  }
  useEffect(() => {
    if (CookieController.readCookie('jwt')) {
      if (document.getElementsByClassName('signin')[0]) {
        document.getElementsByClassName('signin')[0].remove();
      }
    } else document.getElementsByClassName('signOutButton')[0].remove();
  });
  return (
    <header>
      <div className='header'>
        <div className='header__inner'>
          <MainLogo text='РЕСОТСТРОЙ'></MainLogo>
        </div>
        <Button href='/auth' className='signin' variant='contained' color='primary'>
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
