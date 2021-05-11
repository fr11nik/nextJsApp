import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import DirectorMenu from '../Items/Menus/DirectorMenu';
import MenuLayout from '../Layouts/MenuLayout';
import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
const HamburgerMenu = props => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    if (state) {
      setState(false);
      return;
    }
    setState(open);
  };
  return (
    <>
      <Fab
        color='secondary'
        className='menuHamburger fabExit'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </Fab>

      <SwipeableDrawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <MenuLayout {...props.userData} show={state}>
          {props.type}
        </MenuLayout>
      </SwipeableDrawer>
    </>
  );
};

export default HamburgerMenu;
