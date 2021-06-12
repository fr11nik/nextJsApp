import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PrefabDialog from '../Dialog/dialogPrefab';
import SnackBar from '../Snacks/SnackBar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import UpdateUser from '../../private/queries/updateUser';
import UniversalFetch from '../../private/queries/univeralQuery';
export default function UserAccount(props) {
  const [user, setUser] = useState({
    idAuth: props.user.id,
    userRoles: props.user.roles,
    username: props.user.login,
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    phonenumber: props.user.phonenumber,
  });
  const [openDialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState('');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  });
  const passwordChange = e => {
    setPasswords(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };
  const handleUpdateUser = () => {
    UpdateUser(user)
      .then(res => {
        setMessage(res);
        setOpen(true);
      })
      .catch(err => {
        setMessage(err.message);
        setOpen(true);
      });
  };
  const handleUpdatePassword = () => {
    UniversalFetch(
      passwords,
      'https://resotstroy-api.herokuapp.com/node-cm/user/changePassword/' +
        user.idAuth,
      'POST',
    )
      .then(res => {
        setMessage(res);
        setOpen(true);
      })
      .catch(err => {
        setMessage(err.message);
        setOpen(true);
      });
  };
  const handleChangeData = e => {
    setUser(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const changePasswordComponents = (
    <Paper className='csspaper' style={{borderRadius: '0px', boxShadow: 'none'}}>
      <TextField
        name='oldPassword'
        value={passwords.oldPassword}
        onChange={passwordChange}
        type='password'
        className='dataField'
        variant='outlined'
        label='Старый пароль*'
      ></TextField>
      <TextField
        name='newPassword'
        value={passwords.newPassword}
        onChange={passwordChange}
        type='password'
        className='dataField'
        variant='outlined'
        label='Новый пароль*'
      ></TextField>
      <TextField
        name='newPasswordRepeat'
        value={passwords.newPasswordRepeat}
        onChange={passwordChange}
        type='password'
        className='dataField'
        variant='outlined'
        label='Повторите новый пароль*'
      ></TextField>
    </Paper>
  );

  return (
    <>
      <TextField
        variant='outlined'
        onChange={handleChangeData}
        name='lastname'
        className='dataField'
        value={user.lastname}
        label='Фамилия*'
      ></TextField>
      <TextField
        variant='outlined'
        onChange={handleChangeData}
        name='firstname'
        className='dataField'
        value={user.firstname}
        label='Имя*'
      ></TextField>
      <TextField
        variant='outlined'
        onChange={handleChangeData}
        name='email'
        className='dataField'
        value={user.email}
        label='Email'
      ></TextField>
      <TextField
        variant='outlined'
        onChange={handleChangeData}
        name='username'
        className='dataField'
        value={user.username}
        label='Логин*'
      ></TextField>
      <TextField
        type='number'
        variant='outlined'
        onChange={handleChangeData}
        name='phonenumber'
        className='dataField'
        value={user.phonenumber}
        label='Номер телефона*'
      ></TextField>
      <Divider style={{margin: '20px 0'}} />
      <Button variant='contained' color='primary' onClick={() => setDialog(true)}>
        Сменить пароль
      </Button>
      <Button className='buttonChange' onClick={handleUpdateUser}>
        Изменить данные
      </Button>
      <PrefabDialog
        title='Изменение данных аккаунта'
        description='Введите старый пароль и новый 2 раза'
        buttonAcceptText='Изменить'
        additionalComponents={changePasswordComponents}
        handle={handleUpdatePassword}
        snackHook={{setMessage, setOpen}}
        openDialog={openDialog}
        setDialog={setDialog}
      />
      <SnackBar open={open} setOpen={setOpen} snackMessage={snackMessage} />
    </>
  );
}
