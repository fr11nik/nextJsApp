import {useRouter} from 'next/router';
import withAuth from '../../../utils/WithAuth';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Paper from '@material-ui/core/Paper';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import UpdateUser from '../../../private/queries/updateUser';
import SnackBar from '../../../components/Snacks/SnackBar';
//setOpen - state
//open - state value
//snackMessage
const ChangeUser = props => {
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState('');
  const [user, setUser] = useState(props.user);
  const [roles, setRoles] = useState(['user', 'admin', 'director', 'moderator']);
  const [passwordStatus, setDisabledPassword] = useState(true);
  const handleChange = e => {
    setUser(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
  return (
    <AdminLayout {...props}>
      <div className='fieldAdd'>
        <Paper className='csspaper' style={{padding: '15px'}}>
          <p className='pTitle'>Изменить данные пользователя</p>
          <TextField
            className='dataField'
            variant='outlined'
            name='firstname'
            onChange={handleChange}
            label='Имя'
            value={user.firstname}
          ></TextField>
          <TextField
            className='dataField'
            variant='outlined'
            label='Фамилия'
            name='lastname'
            onChange={handleChange}
            value={user.lastname}
          ></TextField>
          <TextField
            className='dataField'
            variant='outlined'
            name='phonenumber'
            onChange={handleChange}
            label='Номер телефона'
            value={user.phonenumber}
          ></TextField>
          <TextField
            className='dataField'
            variant='outlined'
            label='Логин'
            name='username'
            onChange={handleChange}
            value={user.username}
          ></TextField>
          <Checkbox
            onClick={e =>
              setDisabledPassword(passwordStatus == false ? true : false)
            }
          ></Checkbox>
          Изменить пароль?
          <TextField
            className='dataField'
            variant='outlined'
            type='password'
            disabled={passwordStatus}
            label='Пароль'
            name='password'
            onChange={handleChange}
            value={user.password}
          ></TextField>
          <InputLabel id='demo-mutiple-checkbox-label'>Роли</InputLabel>
          <Select
            className='roleInput'
            labelId='demo-mutiple-checkbox-label'
            id='demo-mutiple-checkbox'
            name='userRoles'
            multiple
            value={user.userRoles}
            onChange={handleChange}
            input={<Input />}
            renderValue={selected => selected.join(', ')}
          >
            {roles.map(role => (
              <MenuItem key={role} value={role}>
                <Checkbox checked={user.userRoles.indexOf(role) > -1} />
                <ListItemText primary={role} />
              </MenuItem>
            ))}
          </Select>
          <Divider style={{margin: '35px 0'}} />
          <Button
            style={{width: '100%'}}
            variant='contained'
            color='primary'
            onClick={() => {
              if (passwordStatus) {
                delete user.password;
              }
              handleUpdateUser();
            }}
          >
            Изменить
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => (window.location.href = './')}
            style={{width: '100%', marginTop: '15px'}}
          >
            Отменить изменения
          </Button>
        </Paper>
        <SnackBar
          setOpen={setOpen}
          open={open}
          snackMessage={snackMessage}
        ></SnackBar>
      </div>
    </AdminLayout>
  );
};
export default withAuth(ChangeUser, 'admin');

ChangeUser.getInitialProps = async ({query, req}) => {
  const {pid} = query;

  const response = await (
    await fetch('http://localhost:3001/api/user/get/' + pid, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-acces-token': req.cookies.jwt,
      },
    })
  ).json();
  return {
    user: response[0],
    pid,
  };
};
