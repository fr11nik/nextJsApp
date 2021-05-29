import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {CreateUser} from '../../../../private/queries';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ComponentWrapper from '../../../Layouts/componentWrapper';

export default function addUser() {
  const [firstname, setfirstname] = React.useState('');
  const [lastname, setlastname] = React.useState('');
  const [phonenumber, setphonenumber] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [email, setemail] = React.useState('');
  const [username, setusername] = React.useState('');
  const [roles, setRoleName] = React.useState([]);
  const [errorValue, setAllError] = React.useState(false);
  const handleChange = event => {
    setRoleName(event.target.value);
  };
  const handleSetfirstname = event => {
    setfirstname(event.target.value);
  };
  const handleSetlastname = event => {
    setlastname(event.target.value);
  };
  const handleSetphonenumber = event => {
    setphonenumber(event.target.value);
  };
  const handleSetpassword = event => {
    setpassword(event.target.value);
  };
  const handleSetemail = event => {
    setemail(event.target.value);
  };
  const handleSetusername = event => {
    setusername(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onCreateUser = e => {
    setAllError(false);
    CreateUser({
      firstname,
      lastname,
      phonenumber,
      username,
      password,
      roles,
      email,
    })
      .then(res => {
        setMessage(res);
      })
      .catch(err => {
        setMessage(err.message);
        setAllError(true);
      });
    setOpen(true);
  };

  const names = ['admin', 'moderator', 'user', 'director'];
  return (
    <>
      <Paper className='csspaper'>
        <p className='pTitle'>Добавить пользователя</p>
        <TextField
          value={firstname}
          className='dataField'
          id='outlined-basic'
          label='Имя'
          variant='outlined'
          error={errorValue}
          onChange={handleSetfirstname}
        />
        <TextField
          value={phonenumber}
          className='dataField'
          id='outlined-basic'
          label='Номер Телефона'
          variant='outlined'
          error={errorValue}
          onChange={handleSetphonenumber}
        />
        <TextField
          value={username}
          className='dataField'
          id='outlined-basic'
          label='Логин'
          variant='outlined'
          error={errorValue}
          onChange={handleSetusername}
        />
        <TextField
          value={lastname}
          className='dataField'
          id='outlined-basic'
          label='Фамилия'
          variant='outlined'
          error={errorValue}
          onChange={handleSetlastname}
        />
        <TextField
          type='password'
          value={password}
          className='dataField'
          id='outlined-basic'
          label='Пароль'
          variant='outlined'
          error={errorValue}
          onChange={handleSetpassword}
        />
        <TextField
          value={email}
          className='dataField'
          id='outlined-basic'
          label='Email'
          variant='outlined'
          error={errorValue}
          onChange={handleSetemail}
        />

        <InputLabel id='demo-mutiple-checkbox-label'>Роли</InputLabel>
        <Select
          className='roleInput'
          labelId='demo-mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          value={roles}
          error={errorValue}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={roles.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>

        <Button
          className='btnCreateUser'
          onClick={onCreateUser}
          variant='contained'
          color='primary'
        >
          Создать пользователя
        </Button>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
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
    </>
  );
}
