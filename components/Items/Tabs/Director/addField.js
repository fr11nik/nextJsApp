import ComponentWrapper from '../../../Layouts/componentWrapper';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CookieController from '../../../../private/CookieController';
const t = props => {
  const [state, setState] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleAdd = async (fieldName, link) => {
    const token = CookieController.readCookie('jwt');
    const res = await fetch(
      'https://resotstroy-api.herokuapp.com/node-cm/' + link + '/create',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-acces-token': token,
        },
        body: JSON.stringify({
          [fieldName]: state,
        }),
      },
    );
    const response = await res.json();
    setMessage(response.message);
    setOpen(true);
  };
  return (
    <div className={props.className}>
      <ComponentWrapper title={props.title}>
        <TextField
          value={state}
          className='dataField'
          id='outlined-basic schedulename'
          label={props.fieldDescription}
          variant='outlined'
          onChange={e => setState(e.target.value)}
        />
        <Button
          className='btnCreateUser'
          style={{marginTop: '15px'}}
          onClick={() => {
            handleAdd(props.fieldName, props.link);
          }}
          variant='contained'
          color='primary'
        >
          {props.buttonText}
        </Button>
      </ComponentWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button color='secondary' size='small' onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
export default t;
