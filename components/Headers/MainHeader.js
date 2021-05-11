import MainLogo from '../Items/Logos/MainLogo';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CookieController from '../../private/CookieController';
import {useRouter} from 'next/router';
import React from 'react';
const MainHeader = props => {
  const router = useRouter();
  function onExit() {
    CookieController.eraseCookie('jwt');
    CookieController.eraseCookie('ssid');
    router.push('/auth');
    const a = (document.getElementsByClassName('signOutButton')[0].className =
      'signOutButton btnhide');
  }

  return (
    <header>
      <div className='header'>
        <div className='header__inner'>
          <MainLogo text='РЕСОТСТРОЙ'></MainLogo>
          <div className='signOutButton'>
            <Fab className='fabExit' aria-label='Выйти' onClick={onExit}>
              <ExitToAppIcon />
            </Fab>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
