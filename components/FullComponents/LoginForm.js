import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Title from '../Items/Titles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {SignIn} from '../../private/queries';

export default function LoginForm(props) {
  const [errorStatuse, setStatuse] = React.useState(false);
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [Mesage, updateContent] = React.useState('result Sign In');
  function onSignIn(e) {
    SignIn({username: username, password: password})
      .then(res => {
        updateContent(res);
        setStatuse(false);
        window.location.href = '/is/adminpanel';
      })
      .catch(err => {
        updateContent(err);
        setStatuse(true);
      });
  }
  const handleChangeName = event => {
    setUserName(event.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  return (
    <div className='arialFont'>
      <div className='sign-in-menu'>
        <form>
          <Grid container direction='column' justify='center' alignItems='center'>
            <Title fontSize='40px' text='Вход в систему' fontWeight='700' />
            <Title
              fontSize='14px'
              text='логин и проль можно получить у администратора'
              opacity='0.7'
            />
            <FormControl
              error={errorStatuse}
              variant='outlined'
              className='grid-spacing15 input550'
            >
              <InputLabel htmlFor='component-outlined'>Логин</InputLabel>
              <OutlinedInput
                autoComplete='on'
                id='component-outlined login'
                value={username}
                onChange={handleChangeName}
                label='Логин'
                aria-describedby={'dadad'}
              />
            </FormControl>
            <FormControl
              error={errorStatuse}
              variant='outlined'
              className='grid-spacing15 input550'
            >
              <InputLabel htmlFor='component-outlined'>Пароль</InputLabel>
              <OutlinedInput
                autoComplete='on'
                id='component-outlined password'
                value={password}
                onChange={handleChangePassword}
                label='Пароль'
                type='password'
              />
            </FormControl>
            <Button
              className='auth grid-spacing15 btn570'
              variant='contained'
              color='primary'
              onClick={onSignIn}
            >
              Войти
            </Button>
            <p>{Mesage}</p>
          </Grid>
        </form>
      </div>
    </div>
  );
}
